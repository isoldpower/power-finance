import { FC } from "react";
import { FinanceButton, UiForm, UiFormField } from "@internal/ui-library";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AddTransactionOnSubmit, quickAddSchema, useQuickAddInitials } from "@feature/transactions";
import type { QuickAddSchema } from "@feature/transactions";
import { FromIcon, QuickAddAmountField, QuickAddTypeSelector, ToIcon } from "@entity/transactions";
import { HideOnFormValue } from "@shared/components/form/HideOnFormValue.tsx";
import { ShowOnFormValue } from "@shared/components/form/ShowOnFormValue.tsx";
import { WalletSelect } from "@entity/wallets";
import type { Wallet } from "@entity/wallets";
import {useWalletsCurrencies} from "@feature/transactions/quick-add/use-wallets-currencies.ts";
import {useCrossCurrencyTransfer} from "@feature/transactions/quick-add/use-cross-currency-transfer.ts";
import {useFormTypeEffects} from "@feature/transactions/quick-add/use-form-type-effects.ts";
import {useFormLoadingState} from "@feature/transactions/quick-add/use-form-loading-state.ts";
import {useFormWalletsList} from "@feature/transactions/quick-add/use-form-wallets-list.tsx";


interface QuickAddFormProps {
	wallets: Wallet[];
}

const QuickAddForm: FC<QuickAddFormProps> = ({ wallets }) => {
	const defaultValues = useQuickAddInitials(wallets);
	const form = useForm<QuickAddSchema>({
		defaultValues,
		mode: 'onChange',
		resolver: zodResolver(quickAddSchema)
	});
	const type = useWatch({
		control: form.control,
		name: 'type'
	});

	const { toCurrency, fromCurrency, currency } = useWalletsCurrencies(wallets, form);
	const { loading, canSubmit, methods } = useFormLoadingState(form);
	const { fromWalletOptions, toWalletOptions } = useFormWalletsList(wallets, form);
	const { handleSentChange, handleReceivedChange } = useCrossCurrencyTransfer(fromCurrency, toCurrency, form);
	useFormTypeEffects(defaultValues, form);

	return (
		<UiForm {...form}>
			<AddTransactionOnSubmit
				handleSubmit={form.handleSubmit}
				onBeforeEdit={methods.handleLoading}
				onSuccess={methods.handleDoneLoading}
				onError={methods.handleFailedLoading}
			>
				<UiFormField
					disabled={loading}
					control={form.control}
					name="type"
					render={({field}) => (
						<QuickAddTypeSelector className="mb-3.5" {...field} />
					)} />
				<HideOnFormValue valueKey='type' hideOn={['income']} control={form.control}>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="fromWallet"
						render={({ field }) => (
							<WalletSelect
								showSwatch={false}
								leadingIcon={<FromIcon className="flex-none text-text-3" />}
								options={fromWalletOptions}
								emptyLabel="No wallets yet"
								className="mt-2"
								{...field} />
						)} />
				</HideOnFormValue>
				<HideOnFormValue valueKey='type' hideOn={['expense']} control={form.control}>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="toWallet"
						render={({ field }) => (
							<WalletSelect
								showSwatch={false}
								leadingIcon={<ToIcon className="flex-none text-text-3" />}
								options={toWalletOptions}
								emptyLabel="Add another wallet"
								className="mt-2"
								{...field} />
						)} />
				</HideOnFormValue>
				<HideOnFormValue valueKey='type' hideOn={['transfer']} control={form.control}>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="amount"
						render={({ field }) => (
							<QuickAddAmountField
								type={type}
								currency={currency}
								className="mt-2"
								{...field}
							/>
						)} />
				</HideOnFormValue>
				<ShowOnFormValue valueKey='type' showOn={['transfer']} control={form.control}>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="amount"
						render={({ field }) => (
							<QuickAddAmountField
								type={type}
								currency={fromCurrency}
								label="Send"
								className="mt-2"
								{...field}
								onChange={handleSentChange}
							/>
						)} />
					<UiFormField
						disabled={loading}
						control={form.control}
						name="receiveAmount"
						render={({ field }) => (
							<QuickAddAmountField
								type={type}
								currency={toCurrency}
								label="Receive"
								className="mt-2"
								{...field}
								onChange={handleReceivedChange}
							/>
						)} />
				</ShowOnFormValue>
				<FinanceButton
					type='submit'
					size="lg"
					className="mt-3.5 w-full"
					disabled={!canSubmit}
				>
					{loading ? 'Adding…' : `Add ${type}`}
				</FinanceButton>
			</AddTransactionOnSubmit>
		</UiForm>
	);
};

QuickAddForm.displayName = 'QuickAddForm';

export { QuickAddForm };
export type { QuickAddFormProps };
