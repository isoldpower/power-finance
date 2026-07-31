import { FinanceButton, UiForm, UiFormField } from "@internal/ui-library";
import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FromIcon, QuickAddAmountField, QuickAddTypeSelector, ToIcon } from "@entity/transactions";
import { WalletSelect, toWalletSelectOptions } from "@entity/wallets";
import {
	useWalletsCurrencies,
	useCrossCurrencyTransfer,
	useFormTypeEffects,
	useFormLoadingState,
	useFormWalletsList
} from "@feature/transactions";
import { AddTransactionOnSubmit, quickAddSchema, useQuickAddInitials } from "@feature/transactions";
import { HideOnFormValue, ShowOnFormValue } from "@shared/components";

import type { FC } from "react";
import type { QuickAddSchema } from "@feature/transactions";
import type { Wallet } from "@entity/wallets";


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
	const walletOptions = useMemo(() => toWalletSelectOptions(wallets), [wallets]);
	const { fromWalletOptions, toWalletOptions } = useFormWalletsList(walletOptions, form);
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
