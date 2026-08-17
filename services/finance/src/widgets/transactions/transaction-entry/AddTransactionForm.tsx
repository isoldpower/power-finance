import { ForwardIcon, FromIcon, ScanReceiptIcon, ToIcon } from "@shared/pure-components/icons";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UiForm, UiFormField } from "@internal/ui-library";

import {
	EntryAmountField,
	EntryCategoryField,
	EntryTypeSelector,
	ScanReceiptCta,
} from "@entity/transactions";
import { WalletSelect, toWalletSelectOptions } from "@entity/wallets";
import {
	TransactionEntryOnSubmit,
	addTransactionSchema,
	useAddTransactionInitials,
	useCrossCurrencyTransfer,
	useEntryFormState,
	useEntryTypeEffects,
	useEntryWalletOptions,
	useTransactionCategories,
	useWalletsCurrencies,
} from "@feature/transactions";
import { useWalletsList } from "@feature/wallets";
import { FieldLabel, HideOnFormValue, PanelFooter, ShowOnFormValue } from "@shared/forms";
import { currencySymbol } from "@shared/formatting";

import type { FC } from "react";
import type { AddTransactionSchema } from "@feature/transactions";


interface AddTransactionFormProps {
	onScanReceipt: () => void;
	onClose: () => void;
}

const AddTransactionForm: FC<AddTransactionFormProps> = ({ onScanReceipt, onClose }) => {
	const { categories } = useTransactionCategories();
	const categoryLabels = useMemo(() => categories.map((category) => category.label), [categories]);
	const { wallets } = useWalletsList();
	const defaultValues = useAddTransactionInitials(wallets);
	const form = useForm<AddTransactionSchema>({
		defaultValues,
		mode: 'onChange',
		resolver: zodResolver(addTransactionSchema),
	});

	const { currency, fromCurrency, toCurrency, type } = useWalletsCurrencies(wallets, form);
	const { loading, canSubmit, methods } = useEntryFormState(form);
	
	const walletOptions = useMemo(() => {
		return toWalletSelectOptions(wallets);
	}, [wallets]);
	const { fromOptions, toOptions } = useEntryWalletOptions(walletOptions, form);
	const { handleSentChange, handleReceivedChange } = useCrossCurrencyTransfer(fromCurrency, toCurrency, form);
	useEntryTypeEffects(defaultValues, form);
	
	return (
		<UiForm {...form}>
			<TransactionEntryOnSubmit
				className="flex flex-1 flex-col overflow-hidden"
				handleSubmit={form.handleSubmit}
				fromCurrency={fromCurrency}
				toCurrency={toCurrency}
				onBeforeEdit={methods.handleLoading}
				onSuccess={() => { methods.handleDoneLoading(); onClose(); }}
				onError={methods.handleFailedLoading}
			>
				<div className="flex-1 overflow-auto p-5">
					<button type="button" onClick={onScanReceipt} className="mb-[18px] w-full">
						<ScanReceiptCta>
							<ScanReceiptIcon size={18} className="flex-none text-primary" />
							<span className="flex-1">
								<ScanReceiptCta.Title>
									Scan a receipt instead
								</ScanReceiptCta.Title>
								<ScanReceiptCta.Paragraph>
									Let AI fill the details for you
								</ScanReceiptCta.Paragraph>
							</span>
							<ForwardIcon className="flex-none text-primary" />
						</ScanReceiptCta>
					</button>
					<UiFormField
						disabled={loading}
						control={form.control}
						name="type"
						render={({ field }) => (
							<EntryTypeSelector className="mb-4" {...field} />
						)} />
					<HideOnFormValue valueKey='type' hideOn={['transfer']} control={form.control}>
						<UiFormField
							disabled={loading}
							control={form.control}
							name="amount"
							render={({ field }) => (
								<div className="mb-3.5">
									<EntryAmountField>
										<EntryAmountField.Box emphasis="accent">
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
					<ShowOnFormValue valueKey='type' showOn={['transfer']} control={form.control}>
						<UiFormField
							disabled={loading}
							control={form.control}
							name="amount"
							render={({ field }) => (
								<div className="mb-2.5">
									<EntryAmountField>
										<EntryAmountField.Label>
											Send
										</EntryAmountField.Label>
										<EntryAmountField.Box emphasis="accent">
											<EntryAmountField.Glyph type={type} emphasis="accent" />
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
								<div className="mb-3.5">
									<EntryAmountField>
										<EntryAmountField.Label>
											Receive
										</EntryAmountField.Label>
										<EntryAmountField.Box emphasis="accent">
											<EntryAmountField.Glyph type={type} emphasis="accent" />
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
					<FieldLabel>{type === 'transfer' ? 'Wallets' : 'Wallet'}</FieldLabel>
					<HideOnFormValue valueKey='type' hideOn={['income']} control={form.control}>
						<UiFormField
							disabled={loading}
							control={form.control}
							name="fromWallet"
							render={({ field }) => {
								const selected = fromOptions.find((option) => option.id === field.value);

								return (
								<WalletSelect>
									<WalletSelect.Trigger className="mb-2">
										{type === 'transfer' ? <FromIcon className="flex-none text-text-3" /> : null}
										{selected ? <WalletSelect.Swatch gradient={selected.gradient} /> : null}
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
									<WalletSelect.Trigger className="mb-2">
										{type === 'transfer' ? <ToIcon className="flex-none text-text-3" /> : null}
										{selected ? <WalletSelect.Swatch gradient={selected.gradient} /> : null}
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
					<ShowOnFormValue valueKey='type' showOn={['expense', 'income']} control={form.control}>
						<FieldLabel>Category</FieldLabel>
						<UiFormField
							disabled={loading}
							control={form.control}
							name="category"
							render={({ field }) => (
								<EntryCategoryField options={categoryLabels} {...field} />
							)} />
					</ShowOnFormValue>
				</div>
				<PanelFooter
					submitType="submit"
					submitLabel={loading 
						? 'Saving…' 
						: type === 'transfer' 
							? 'Send transfer' 
							: 'Save transaction'}
					onClose={onClose}
					submitDisabled={!canSubmit}
				/>
			</TransactionEntryOnSubmit>
		</UiForm>
	);
};

AddTransactionForm.displayName = 'AddTransactionForm';

export { AddTransactionForm };
export type { AddTransactionFormProps };
