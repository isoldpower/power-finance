import { FromIcon, ToIcon } from "@shared/pure-components/icons";
import { FinanceButton, UiForm, UiFormField } from "@internal/ui-library";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EntryAmountField, EntryCategoryField, EntryTypeSelector } from "@entity/transactions";
import { WalletSelect, toWalletSelectOptions } from "@entity/wallets";
import {
	TransactionEntryOnSubmit,
	useCrossCurrencyTransfer,
	useEntryFormState,
	useEntryTypeEffects,
	useEntryWalletOptions,
	useWalletsCurrencies,
	useTransactionCategories,
	quickAddSchema,
	useQuickAddInitials,
} from "@feature/transactions";
import { HideOnFormValue, ShowOnFormValue } from "@shared/forms";

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

	const { toCurrency, fromCurrency, currency, type } = useWalletsCurrencies(wallets, form);
	const { loading, canSubmit, methods } = useEntryFormState(form);
	const { categories } = useTransactionCategories();
	const categoryLabels = useMemo(() => categories.map((category) => category.label), [categories]);
	const walletOptions = useMemo(() => toWalletSelectOptions(wallets), [wallets]);
	const { fromOptions, toOptions } = useEntryWalletOptions(walletOptions, form);
	const { handleSentChange, handleReceivedChange } = useCrossCurrencyTransfer(fromCurrency, toCurrency, form);
	useEntryTypeEffects(defaultValues, form);

	return (
		<UiForm {...form}>
			<TransactionEntryOnSubmit
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
						<EntryTypeSelector className="mb-3.5" {...field} />
					)} />
				<HideOnFormValue valueKey='type' hideOn={['transfer']} control={form.control}>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="amount"
						render={({ field }) => (
							<EntryAmountField
								type={type}
								currency={currency}
								className="mt-2"
								{...field}
							/>
						)} />
				</HideOnFormValue>
				<HideOnFormValue valueKey='type' hideOn={['income']} control={form.control}>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="fromWallet"
						render={({ field }) => (
							<WalletSelect
								showSwatch={false}
								leadingIcon={<FromIcon className="flex-none text-text-3" />}
								options={fromOptions}
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
								options={toOptions}
								emptyLabel="Add another wallet"
								className="mt-2"
								{...field} />
						)} />
				</HideOnFormValue>
				<ShowOnFormValue valueKey='type' showOn={['transfer']} control={form.control}>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="amount"
						render={({ field }) => (
							<EntryAmountField
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
							<EntryAmountField
								type={type}
								currency={toCurrency}
								label="Receive"
								className="mt-2"
								{...field}
								onChange={handleReceivedChange}
							/>
						)} />
				</ShowOnFormValue>
				<HideOnFormValue valueKey='type' hideOn={['transfer']} control={form.control}>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="category"
						render={({ field }) => (
							<EntryCategoryField
								options={categoryLabels}
								className="mt-3.5"
								{...field}
							/>
						)} />
				</HideOnFormValue>
				<FinanceButton
					type='submit'
					size="lg"
					className="mt-3.5 w-full"
					disabled={!canSubmit}
				>
					{loading ? 'Adding…' : '＋ Add transaction'}
				</FinanceButton>
			</TransactionEntryOnSubmit>
		</UiForm>
	);
};

QuickAddForm.displayName = 'QuickAddForm';

export { QuickAddForm };
export type { QuickAddFormProps };
