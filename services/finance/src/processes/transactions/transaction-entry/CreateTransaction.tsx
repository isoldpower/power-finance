import { useCallback, useMemo } from "react";
import { UiForm } from "@internal/ui-library";

import {
	addTransactionSchema,
	TransactionEntryOnSubmit,
	useAddTransactionInitials,
	useEntryAdjustment,
	useTransactionEntryForm,
} from "@feature/transactions";
import { useWalletsList, useWalletsSelection } from "@feature/wallets";
import { useCategories } from "@feature/categories";
import { ManageCategoriesLink } from "@feature/navigation";
import {
	AdjustedTransactionCombobox,
	EntryAmountControl,
	EntryCategoryControl,
	EntryTypeControl,
	EntryWalletControl,
	ScanReceiptButton,
} from "@widget/transactions";
import { SlideOver, useSlideOverContext } from "@shared/overlays";
import { FieldLabel, FieldLabelRow, HideOnFormValue, PanelFooter, ShowOnFormValue } from "@shared/forms";
import { FromIcon, ToIcon } from "@shared/pure-components/icons";
import { ShowOn } from "@internal/shared";

import type { FC } from "react";
import type { CategoryRef } from "@entity/categories";


interface CreateTransactionProps {
	scanPanelId: string;
	title?: string;
	adjusts?: string;
	adjustedWalletId?: string;
	adjustedCategory?: CategoryRef | null;
}

const CreateTransaction: FC<CreateTransactionProps> = ({
	scanPanelId,
	title = 'New transaction',
	adjusts,
	adjustedWalletId,
	adjustedCategory,
}) => {
	const { onClose, onSwitch } = useSlideOverContext();
	const { categories } = useCategories('transaction');
	const { wallets } = useWalletsList();
	const selectedWalletId = useWalletsSelection((state) => state.selectedWalletId);
	const preferredWalletId = adjustedWalletId ?? selectedWalletId ?? undefined;
	const defaultValues = useAddTransactionInitials(wallets, preferredWalletId, adjusts, adjustedCategory ?? null);
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
	} = useTransactionEntryForm({
		schema: addTransactionSchema,
		defaultValues,
		wallets,
		preferredWalletId,
	});
	const { adjusted, adjusting, pick } = useEntryAdjustment(form);

	const handleScanReceipt = useCallback(() => {
		onSwitch(scanPanelId);
	}, [onSwitch, scanPanelId]);

	const submitLabel = useMemo(() => {
		if (loading) {
			return 'Saving…';
		}

		if (adjusting) {
			return 'Save adjustment';
		}

		return type === 'transfer' ? 'Send transfer' : 'Save transaction';
	}, [loading, adjusting, type]);

	return (
		<>
			<SlideOver.Heading>
				<SlideOver.Title>
					{title}
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
					adjusted={adjusted ?? null}
					onBeforeEdit={methods.handleLoading}
					onSuccess={() => { methods.handleDoneLoading(); onClose(); }}
					onError={methods.handleFailedLoading}
				>
					<div className="flex-1 overflow-auto p-5">
						<ShowOn condition={adjusts === undefined}>
							<ScanReceiptButton
								title="Scan a receipt instead"
								description="Let AI fill the details for you"
								className="mb-[18px] w-full"
								onClick={handleScanReceipt}
							/>
						</ShowOn>
						<EntryTypeControl
							control={form.control}
							name="type"
							allowTransfer={!adjusting}
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
								direction="out"
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
								direction="in"
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
							<FieldLabelRow action={<ManageCategoriesLink />}>
								Category
							</FieldLabelRow>
							<EntryCategoryControl
								control={form.control}
								name="category"
								options={categories}
								disabled={loading}
							/>
						</ShowOnFormValue>
						<div className="mt-4">
							<FieldLabel>
								Adjusts
							</FieldLabel>
							<AdjustedTransactionCombobox
								selected={adjusted}
								placeholder={adjusting ? 'Loading transaction…' : 'Not an adjustment'}
								disabled={loading}
								onSelect={pick}
							/>
						</div>
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
