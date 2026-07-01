import type { FC } from "react";
import { useEffect, useState } from "react";
import { cn, FinanceChip, FinanceSegmented, FinanceSegmentedItem } from "@internal/ui-library";

import { useWalletsList } from "@feature/wallets";
import { currencySymbol, sanitizeAmountInput } from "@shared/utils";
import { WalletSelect } from "@entity/wallet";
import type { WalletSelectOption } from "@entity/wallet";
import { TransferGlyph, FromIcon, ToIcon } from "@entity/transaction";
import { TRANSACTION_TYPE_TONE as TONE_TEXT } from "@shared/utils";
import type { TransactionEntryType } from "@shared/utils";
import { PanelFooter } from "@entity/management";
import { FieldLabel } from "@shared/components";

import { useTransactionsListMethods } from "../data-presenters";
import { MOCK_TXN_CATEGORIES, PanelMode } from "@feature/TODO";


type TransactionType = TransactionEntryType;

interface AddTransactionFormProps {
	onSwitch: (mode: PanelMode) => void;
	onClose: () => void;
}

const AddTransactionForm: FC<AddTransactionFormProps> = ({ onSwitch, onClose }) => {
	const { wallets } = useWalletsList();
	const { meta } = useTransactionsListMethods();

	const [type, setType] = useState<TransactionType>('expense');
	const [amount, setAmount] = useState('');
	const [fromId, setFromId] = useState('');
	const [toId, setToId] = useState('');
	const [category, setCategory] = useState('Groceries');

	useEffect(() => {
		if (wallets.length === 0) return;
		setFromId((prev) => prev || wallets[0].id);
		setToId((prev) => prev || (wallets.find((wallet) => wallet.id !== wallets[0].id)?.id ?? ''));
	}, [wallets]);

	const isTransfer = type === 'transfer';
	const fromWallet = wallets.find((wallet) => wallet.id === fromId);
	const currency = fromWallet?.balance.currency ?? 'USD';
	const numericAmount = parseFloat(amount);
	const amountValid = !Number.isNaN(numericAmount) && numericAmount > 0;
	const transferValid = !isTransfer || (toId !== '' && toId !== fromId);
	const canSubmit = fromId !== '' && amountValid && transferValid && !meta.createMutation.isPending;

	const onSubmit = () => {
		if (!canSubmit) return;
		const abs = Math.abs(numericAmount).toFixed(2);

		if (isTransfer) {
			Promise.all([
				meta.createMutation.mutateAsync({ data: { source_wallet_id: fromId, amount: `-${abs}` } }),
				meta.createMutation.mutateAsync({ data: { source_wallet_id: toId, amount: abs } }),
			]).then(() => { onClose(); }).catch((error: unknown) => { console.error(error); });
			return;
		}

		const signed = type === 'income' ? abs : `-${abs}`;
		meta.createMutation.mutate(
			{ data: { source_wallet_id: fromId, amount: signed } },
			{ onSuccess: () => { onClose(); } }
		);
	};

	const walletOptions = (excludeId?: string): WalletSelectOption[] =>
		wallets
			.filter((wallet) => wallet.id !== excludeId)
			.map((wallet) => ({ id: wallet.id, name: wallet.name, currency: wallet.balance.currency, gradient: 'rgba(0, 0, 0, 1)' }));

	return (
		<>
			<div className="flex-1 overflow-auto p-5">
				<button
					type="button"
					onClick={() => { onSwitch('scan'); }}
					className="mb-[18px] flex w-full items-center gap-2.5 rounded-[var(--radius-md)] border border-dashed border-[var(--accent-border)] bg-[var(--accent-soft)] px-3.5 py-2.5 text-left transition-colors hover:border-primary"
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
						<circle cx="12" cy="13" r="4" />
					</svg>
					<div className="flex-1">
						<div className="text-[13px] font-semibold text-primary">Scan a receipt instead</div>
						<div className="text-[11.5px] text-text-2">Let AI fill the details for you</div>
					</div>
					<span className="text-primary">→</span>
				</button>

				<FinanceSegmented value={type} onValueChange={(value) => { if (value) setType(value as TransactionType); }} className="mb-4 w-full">
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
						onChange={(event) => { setAmount(sanitizeAmountInput(event.target.value)); }}
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
					onChange={setFromId}
					emptyLabel="No wallets yet"
					className="mb-2"
				/>

				{isTransfer ? (
					<>
						<WalletSelect
							leadingIcon={<ToIcon className="flex-none text-text-3" />}
							options={walletOptions(fromId)}
							value={toId}
							onChange={setToId}
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
								<FinanceChip key={option} pressed={category === option} onPressedChange={() => { setCategory(option); }}>
									{option}
								</FinanceChip>
							))}
						</div>
					</>
				)}
			</div>
			<PanelFooter
				submitLabel={meta.createMutation.isPending ? 'Saving…' : isTransfer ? 'Send transfer' : 'Save transaction'}
				onClose={onClose}
				onSubmit={onSubmit}
				submitDisabled={!canSubmit}
			/>
		</>
	);
};

AddTransactionForm.displayName = 'AddTransactionForm';

export { AddTransactionForm };
export type { AddTransactionFormProps };
