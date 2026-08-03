import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UiForm, UiFormField } from "@internal/ui-library";

import {
	EntryAmountField,
	EntryCategoryField,
	EntryTypeSelector,
	ForwardIcon,
	FromIcon,
	ScanReceiptCta, ScanReceiptIcon,
	ToIcon,
} from "@entity/transactions";
import { WalletSelect, toWalletSelectOptions } from "@entity/wallets";
import {
	MOCK_TXN_CATEGORIES,
	TransactionEntryOnSubmit,
	addTransactionSchema,
	useAddTransactionInitials,
	useCrossCurrencyTransfer,
	useEntryFormState,
	useEntryTypeEffects,
	useEntryWalletOptions,
	useWalletsCurrencies,
} from "@feature/transactions";
import { useWalletsList } from "@feature/wallets";
import { HideOnFormValue, ShowOnFormValue, PanelFooter, FieldLabel } from "@shared/components";

import type { FC } from "react";
import type { AddTransactionSchema } from "@feature/transactions";


interface AddTransactionFormProps {
	onScanReceipt: () => void;
	onClose: () => void;
}

const AddTransactionForm: FC<AddTransactionFormProps> = ({ onScanReceipt, onClose }) => {
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
				onBeforeEdit={methods.handleLoading}
				onSuccess={() => { methods.handleDoneLoading(); onClose(); }}
				onError={methods.handleFailedLoading}
			>
				<div className="flex-1 overflow-auto p-5">
					<button type="button" onClick={onScanReceipt} className="mb-[18px] w-full">
						<ScanReceiptCta.Container>
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
						</ScanReceiptCta.Container>
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
								<EntryAmountField
									type={type}
									currency={currency}
									emphasis="accent"
									className="mb-3.5"
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
								<EntryAmountField
									type={type}
									currency={fromCurrency}
									label="Send"
									emphasis="accent"
									className="mb-2.5"
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
									emphasis="accent"
									className="mb-3.5"
									{...field}
									onChange={handleReceivedChange}
								/>
							)} />
					</ShowOnFormValue>
					<FieldLabel>{type === 'transfer' ? 'Wallets' : 'Wallet'}</FieldLabel>
					<HideOnFormValue valueKey='type' hideOn={['income']} control={form.control}>
						<UiFormField
							disabled={loading}
							control={form.control}
							name="fromWallet"
							render={({ field }) => (
								<WalletSelect
									leadingIcon={type === 'transfer' ? <FromIcon className="flex-none text-text-3" /> : undefined}
									options={fromOptions}
									emptyLabel="No wallets yet"
									className="mb-2"
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
									leadingIcon={type === 'transfer' ? <ToIcon className="flex-none text-text-3" /> : undefined}
									options={toOptions}
									emptyLabel="Add another wallet"
									className="mb-2"
									{...field} />
							)} />
					</HideOnFormValue>
					<ShowOnFormValue valueKey='type' showOn={['expense', 'income']} control={form.control}>
						<FieldLabel>Category</FieldLabel>
						<UiFormField
							disabled={loading}
							control={form.control}
							name="category"
							render={({ field }) => (
								<EntryCategoryField options={MOCK_TXN_CATEGORIES} {...field} />
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
