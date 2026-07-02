import type { FC } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, FinanceChip, FinanceSegmented, FinanceSegmentedItem } from "@internal/ui-library";

import { useWalletsList } from "@feature/wallets";
import { AddTransactionForm as AddTransactionFormWrapper, addTransactionSchema } from "@feature/transactions/transaction-entry";
import type { AddTransactionSchema } from "@feature/transactions/transaction-entry";
import { currencySymbol, sanitizeAmountInput } from "@shared/utils";
import { TRANSACTION_TYPE_TONE as TONE_TEXT } from "@shared/utils";
import { WalletSelect, DEFAULT_WALLET_GRADIENT } from "@entity/wallets";
import type { WalletSelectOption } from "@entity/wallets";
import { TransferGlyph, FromIcon, ToIcon, ScanReceiptIcon } from "@entity/transactions";
import { PanelFooter, FieldLabel } from "@shared/components";
import { MOCK_TXN_CATEGORIES } from "@feature/transactions";
import type { PanelMode } from "@feature/wallets";

interface AddTransactionFormProps {
	onSwitch: (mode: PanelMode) => void;
	onClose: () => void;
}

const AddTransactionForm: FC<AddTransactionFormProps> = ({ onSwitch, onClose }) => {
	const { wallets } = useWalletsList();
	const form = useForm<AddTransactionSchema>({
		resolver: zodResolver(addTransactionSchema),
		defaultValues: { type: 'expense', amount: '', fromId: '', toId: '', category: 'Groceries' },
	});
	const { type, amount, fromId, toId } = form.watch();

	useEffect(() => {
		if (wallets.length === 0) return;
		if (form.getValues('fromId') === '') form.setValue('fromId', wallets[0].id);
		if (form.getValues('toId') === '') form.setValue('toId', wallets.find((wallet) => wallet.id !== wallets[0].id)?.id ?? '');
	}, [wallets, form]);

	const isTransfer = type === 'transfer';
	const fromWallet = wallets.find((wallet) => wallet.id === fromId);
	const currency = fromWallet?.balance.currency ?? 'USD';
	const numericAmount = parseFloat(amount);
	const amountValid = !Number.isNaN(numericAmount) && numericAmount > 0;
	const transferValid = !isTransfer || (toId !== '' && toId !== fromId);
	const canSubmit = fromId !== '' && amountValid && transferValid;

	const walletOptions = (excludeId?: string): WalletSelectOption[] =>
		wallets
			.filter((wallet) => wallet.id !== excludeId)
			.map((wallet) => ({ id: wallet.id, name: wallet.name, currency: wallet.balance.currency, gradient: DEFAULT_WALLET_GRADIENT }));

	return (
		<AddTransactionFormWrapper handleSubmit={form.handleSubmit} onSuccess={onClose}>
			<div className="flex-1 overflow-auto p-5">
				<button
					type="button"
					onClick={() => { onSwitch('scan'); }}
					className="mb-[18px] flex w-full items-center gap-2.5 rounded-[var(--radius-md)] border border-dashed border-[var(--accent-border)] bg-[var(--accent-soft)] px-3.5 py-2.5 text-left transition-colors hover:border-primary"
				>
					<ScanReceiptIcon size={18} className="flex-none text-primary" />
					<div className="flex-1">
						<div className="text-[13px] font-semibold text-primary">Scan a receipt instead</div>
						<div className="text-[11.5px] text-text-2">Let AI fill the details for you</div>
					</div>
					<span className="text-primary">→</span>
				</button>

				<FinanceSegmented value={type} onValueChange={(value) => { if (value) form.setValue('type', value as AddTransactionSchema['type']); }} className="mb-4 w-full">
					<FinanceSegmentedItem value="expense" accent className="flex-1">Expense</FinanceSegmentedItem>
					<FinanceSegmentedItem value="income" accent className="flex-1">Income</FinanceSegmentedItem>
					<FinanceSegmentedItem value="transfer" accent className="flex-1">Transfer</FinanceSegmentedItem>
				</FinanceSegmented>

				<div className="mb-3.5 flex items-center gap-2 rounded-[var(--radius-md)] border-[1.5px] border-primary px-4 py-3.5 shadow-[0_0_0_3px_var(--accent-soft)]">
					{isTransfer ? (
						<TransferGlyph className={TONE_TEXT[type]} size={26} />
					) : (
						<span className={cn("font-display text-2xl", TONE_TEXT[type])}>{type === 'income' ? '+' : '−'}</span>
					)}
					<span className={cn("font-display text-3xl font-semibold", TONE_TEXT[type])}>{currencySymbol(currency)}</span>
					<input
						value={amount}
						onChange={(event) => { form.setValue('amount', sanitizeAmountInput(event.target.value)); }}
						inputMode="decimal"
						placeholder="0.00"
						className={cn(
							"w-full min-w-0 flex-1 border-none bg-transparent p-0 font-display text-3xl font-semibold outline-none placeholder:text-[var(--text-3)]",
							TONE_TEXT[type]
						)}
					/>
				</div>

				<FieldLabel>{isTransfer ? 'Wallets' : 'Wallet'}</FieldLabel>
				<WalletSelect
					leadingIcon={isTransfer ? <FromIcon className="flex-none text-text-3" /> : undefined}
					options={walletOptions()}
					value={fromId}
					onChange={(value) => { form.setValue('fromId', value); }}
					emptyLabel="No wallets yet"
					className="mb-2"
				/>

				{isTransfer ? (
					<>
						<WalletSelect
							leadingIcon={<ToIcon className="flex-none text-text-3" />}
							options={walletOptions(fromId)}
							value={toId}
							onChange={(value) => { form.setValue('toId', value); }}
							emptyLabel="Add another wallet"
							className="mb-1"
						/>
						{toId === fromId && wallets.length > 1 ? (
							<div className="mt-1 text-[11.5px] text-neg">Choose a different destination wallet.</div>
						) : null}
					</>
				) : (
					<>
						<FieldLabel>Category</FieldLabel>
						<div className="flex flex-wrap gap-1.5">
							{MOCK_TXN_CATEGORIES.map((option) => (
								<FinanceChip key={option} pressed={form.watch('category') === option} onPressedChange={() => { form.setValue('category', option); }}>
									{option}
								</FinanceChip>
							))}
						</div>
					</>
				)}
			</div>
			<PanelFooter
				submitType="submit"
				submitLabel={isTransfer ? 'Send transfer' : 'Save transaction'}
				onClose={onClose}
				submitDisabled={!canSubmit}
			/>
		</AddTransactionFormWrapper>
	);
};

AddTransactionForm.displayName = 'AddTransactionForm';

export { AddTransactionForm };
export type { AddTransactionFormProps };
