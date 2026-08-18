import {useCallback, useMemo} from "react";
import { UiForm } from "@internal/ui-library";

import {
	addTransactionSchema,
	TransactionEntryOnSubmit,
	useAddTransactionInitials,
	useTransactionCategories,
	useTransactionEntryForm,
} from "@feature/transactions";
import { useWalletsList } from "@feature/wallets";
import {
	EntryAmountControl,
	EntryCategoryControl,
	EntryTypeControl,
	EntryWalletControl,
	ScanReceiptButton,
} from "@widget/transactions";
import { SlideOver, useSlideOverContext } from "@shared/overlays";
import { FieldLabel, HideOnFormValue, PanelFooter, ShowOnFormValue } from "@shared/forms";
import { FromIcon, ToIcon } from "@shared/pure-components/icons";

import type { FC } from "react";


interface CreateTransactionProps {
	scanPanelId: string;
}

const CreateTransaction: FC<CreateTransactionProps> = ({ scanPanelId }) => {
	const { onClose, onSwitch } = useSlideOverContext();
	const { categoryLabels } = useTransactionCategories();
	const { wallets } = useWalletsList();
	const defaultValues = useAddTransactionInitials(wallets);
	const {
		form,
		type,
		currency,
		fromCurrency,
		toCurrency,
		fromOptions,
		toOptions,
		handleSentChange,
		handleReceivedChange,
		state: { loading, canSubmit, methods },
	} = useTransactionEntryForm({ schema: addTransactionSchema, defaultValues, wallets });

	const handleScanReceipt = useCallback(() => {
		onSwitch(scanPanelId);
	}, [onSwitch, scanPanelId]);

	const submitLabel = useMemo(() => {
		return loading 
			? 'Saving…' 
			: type === 'transfer' 
				? 'Send transfer' 
				: 'Save transaction';
	}, [loading, type]);

	return (
		<>
			<SlideOver.Heading>
				<SlideOver.Title>
					New transaction
				</SlideOver.Title>
				<SlideOver.Collapse>
					✕
				</SlideOver.Collapse>
			</SlideOver.Heading>
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
						<ScanReceiptButton
							title="Scan a receipt instead"
							description="Let AI fill the details for you"
							className="mb-[18px] w-full"
							onClick={handleScanReceipt}
						/>
						<EntryTypeControl
							control={form.control}
							name="type"
							className="mb-4"
							disabled={loading}
						/>
						<HideOnFormValue valueKey="type" hideOn={['transfer']} control={form.control}>
							<EntryAmountControl
								control={form.control}
								name="amount"
								type={type}
								currency={currency}
								emphasis="accent"
								className="mb-3.5"
								disabled={loading}
							/>
						</HideOnFormValue>
						<ShowOnFormValue valueKey="type" showOn={['transfer']} control={form.control}>
							<EntryAmountControl
								control={form.control}
								name="amount"
								type={type}
								currency={fromCurrency}
								label="Send"
								emphasis="accent"
								className="mb-2.5"
								disabled={loading}
								onChange={handleSentChange}
							/>
							<EntryAmountControl
								control={form.control}
								name="receiveAmount"
								type={type}
								currency={toCurrency}
								label="Receive"
								emphasis="accent"
								className="mb-3.5"
								disabled={loading}
								onChange={handleReceivedChange}
							/>
						</ShowOnFormValue>
						<FieldLabel>
							{type === 'transfer' ? 'Wallets' : 'Wallet'}
						</FieldLabel>
						<HideOnFormValue valueKey="type" hideOn={['income']} control={form.control}>
							<EntryWalletControl
								control={form.control}
								name="fromWallet"
								options={fromOptions}
								emptyLabel="No wallets yet"
								placeholder="Select wallet"
								leadingIcon={type === 'transfer' 
									? <FromIcon className="flex-none text-text-3" /> 
									: null}
								className="mb-2"
								disabled={loading}
							/>
						</HideOnFormValue>
						<HideOnFormValue valueKey="type" hideOn={['expense']} control={form.control}>
							<EntryWalletControl
								control={form.control}
								name="toWallet"
								options={toOptions}
								emptyLabel="Add another wallet"
								placeholder="Select wallet"
								leadingIcon={type === 'transfer' 
									? <ToIcon className="flex-none text-text-3" /> 
									: null}
								className="mb-2"
								disabled={loading}
							/>
						</HideOnFormValue>
						<ShowOnFormValue valueKey="type" showOn={['expense', 'income']} control={form.control}>
							<FieldLabel>Category</FieldLabel>
							<EntryCategoryControl
								control={form.control}
								name="category"
								options={categoryLabels}
								disabled={loading}
							/>
						</ShowOnFormValue>
					</div>
					<PanelFooter
						submitType="submit"
						submitLabel={submitLabel}
						onClose={onClose}
						submitDisabled={!canSubmit}
					/>
				</TransactionEntryOnSubmit>
			</UiForm>
		</>
	);
};

CreateTransaction.displayName = 'CreateTransaction';

export { CreateTransaction };
export type { CreateTransactionProps };
