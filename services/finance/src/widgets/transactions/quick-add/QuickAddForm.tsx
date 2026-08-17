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
import { currencySymbol } from "@shared/formatting";

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
				fromCurrency={fromCurrency}
				toCurrency={toCurrency}
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
							<div className="mt-2">
								<EntryAmountField>
									<EntryAmountField.Box>
										<EntryAmountField.Sign type={type}>
											{type === 'income' ? '+' : '−'}
										</EntryAmountField.Sign>
										<EntryAmountField.Symbol type={type}>
											{currencySymbol(currency)}
										</EntryAmountField.Symbol>
										<EntryAmountField.Input
											type={type}
											value={field.value}
											onChange={field.onChange}
										/>
									</EntryAmountField.Box>
								</EntryAmountField>
							</div>
						)} />
				</HideOnFormValue>
				<HideOnFormValue valueKey='type' hideOn={['income']} control={form.control}>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="fromWallet"
						render={({ field }) => {
							const selected = fromOptions.find((option) => option.id === field.value);

							return (
							<WalletSelect>
								<WalletSelect.Trigger className="mt-2">
									<FromIcon className="flex-none text-text-3" />
									<WalletSelect.Value placeholder={!selected}>
										{selected ? selected.name : 'Select wallet'}
									</WalletSelect.Value>
									{selected ? (
										<WalletSelect.Currency>
											{selected.currency}
										</WalletSelect.Currency>
									) : null}
									<WalletSelect.Caret />
								</WalletSelect.Trigger>
								<WalletSelect.Options>
									{fromOptions.length === 0 ? (
										<WalletSelect.Empty>
											No wallets yet
										</WalletSelect.Empty>
									) : (
										fromOptions.map((option) => (
											<WalletSelect.Option
												key={option.id}
												onSelect={() => { field.onChange(option.id); }}
											>
												<WalletSelect.Swatch gradient={option.gradient} />
												<WalletSelect.OptionName>
													{option.name}
												</WalletSelect.OptionName>
												<WalletSelect.Currency size="10.5">
													{option.currency}
												</WalletSelect.Currency>
												{option.id === field.value ? <WalletSelect.Selected /> : null}
											</WalletSelect.Option>
										))
									)}
								</WalletSelect.Options>
							</WalletSelect>
							);
						}} />
				</HideOnFormValue>
				<HideOnFormValue valueKey='type' hideOn={['expense']} control={form.control}>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="toWallet"
						render={({ field }) => {
							const selected = toOptions.find((option) => option.id === field.value);

							return (
							<WalletSelect>
								<WalletSelect.Trigger className="mt-2">
									<ToIcon className="flex-none text-text-3" />
									<WalletSelect.Value placeholder={!selected}>
										{selected ? selected.name : 'Select wallet'}
									</WalletSelect.Value>
									{selected ? (
										<WalletSelect.Currency>
											{selected.currency}
										</WalletSelect.Currency>
									) : null}
									<WalletSelect.Caret />
								</WalletSelect.Trigger>
								<WalletSelect.Options>
									{toOptions.length === 0 ? (
										<WalletSelect.Empty>
											Add another wallet
										</WalletSelect.Empty>
									) : (
										toOptions.map((option) => (
											<WalletSelect.Option
												key={option.id}
												onSelect={() => { field.onChange(option.id); }}
											>
												<WalletSelect.Swatch gradient={option.gradient} />
												<WalletSelect.OptionName>
													{option.name}
												</WalletSelect.OptionName>
												<WalletSelect.Currency size="10.5">
													{option.currency}
												</WalletSelect.Currency>
												{option.id === field.value ? <WalletSelect.Selected /> : null}
											</WalletSelect.Option>
										))
									)}
								</WalletSelect.Options>
							</WalletSelect>
							);
						}} />
				</HideOnFormValue>
				<ShowOnFormValue valueKey='type' showOn={['transfer']} control={form.control}>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="amount"
						render={({ field }) => (
							<div className="mt-2">
								<EntryAmountField>
									<EntryAmountField.Label>
										Send
									</EntryAmountField.Label>
									<EntryAmountField.Box>
										<EntryAmountField.Glyph type={type} />
										<EntryAmountField.Symbol type={type}>
											{currencySymbol(fromCurrency)}
										</EntryAmountField.Symbol>
										<EntryAmountField.Input
											type={type}
											value={field.value}
											onChange={handleSentChange}
										/>
									</EntryAmountField.Box>
								</EntryAmountField>
							</div>
						)} />
					<UiFormField
						disabled={loading}
						control={form.control}
						name="receiveAmount"
						render={({ field }) => (
							<div className="mt-2">
								<EntryAmountField>
									<EntryAmountField.Label>
										Receive
									</EntryAmountField.Label>
									<EntryAmountField.Box>
										<EntryAmountField.Glyph type={type} />
										<EntryAmountField.Symbol type={type}>
											{currencySymbol(toCurrency)}
										</EntryAmountField.Symbol>
										<EntryAmountField.Input
											type={type}
											value={field.value}
											onChange={handleReceivedChange}
										/>
									</EntryAmountField.Box>
								</EntryAmountField>
							</div>
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
