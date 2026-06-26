import type { FC } from "react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";
import {
	cn,
	FinanceCard,
	FinanceSegmented,
	FinanceSegmentedItem,
	FinanceButton,
} from "@internal/ui-library";

import { useWalletsList } from "@feature/wallet";
import { useTransactionsListMethods } from "@feature/transaction";
import { currencySymbol, sanitizeAmountInput } from "@shared/utils";

type QuickAddType = 'expense' | 'income' | 'transfer';

const TYPE_OPTIONS: { key: QuickAddType; label: string }[] = [
	{ key: 'expense', label: 'Expense' },
	{ key: 'income', label: 'Income' },
	{ key: 'transfer', label: 'Transfer' },
];

const SIGN_COLOR: Record<QuickAddType, string> = {
	expense: 'text-neg',
	income: 'text-pos',
	transfer: 'text-primary',
};

const walletSelectClass =
	"cursor-pointer rounded-[var(--radius-md)] border border-border-strong bg-card px-3.5 py-2.5 text-[13px] font-semibold outline-none";

const walletFieldClass =
	"flex items-center gap-2.5 rounded-[var(--radius-md)] border border-border-strong bg-card px-3.5 py-2.5";

const innerSelectClass =
	"min-w-0 flex-1 cursor-pointer border-none bg-transparent text-[13px] font-semibold outline-none";

const TransferGlyph: FC<{ className?: string }> = ({ className }) => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
		<path d="M7 10l-4 4 4 4" />
		<path d="M3 14h13a4 4 0 0 0 4-4V6" />
	</svg>
);

const FromIcon: FC<{ className?: string }> = ({ className }) => (
	<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
		<line x1="7" y1="17" x2="17" y2="7" />
		<polyline points="7 7 17 7 17 17" />
	</svg>
);

const ToIcon: FC<{ className?: string }> = ({ className }) => (
	<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
		<line x1="7" y1="7" x2="17" y2="17" />
		<polyline points="17 7 17 17 7 17" />
	</svg>
);

interface QuickAddPanelProps {
	className?: string;
}

const QuickAddPanel: FC<QuickAddPanelProps> = ({ className }) => {
	const { wallets } = useWalletsList();
	const { createTransaction, meta } = useTransactionsListMethods();

	const [type, setType] = useState<QuickAddType>('expense');
	const [amount, setAmount] = useState('');
	const [walletId, setWalletId] = useState('');
	const [toWalletId, setToWalletId] = useState('');

	useEffect(() => {
		if (wallets.length === 0) return;
		setWalletId((prev) => prev || wallets[0].id);
		setToWalletId((prev) => prev || (wallets.find((wallet) => wallet.id !== wallets[0].id)?.id ?? ''));
	}, [wallets]);

	const isTransfer = type === 'transfer';
	const signColor = SIGN_COLOR[type];
	const currency = wallets.find((wallet) => wallet.id === walletId)?.balance.currency ?? 'USD';
	const numericAmount = parseFloat(amount);
	const amountValid = !Number.isNaN(numericAmount) && numericAmount > 0;
	const transferValid = !isTransfer || (toWalletId !== '' && toWalletId !== walletId);
	const canSubmit = walletId !== '' && amountValid && transferValid && !meta.createMutation.isPending;

	const onAdd = () => {
		if (!canSubmit) return;
		const abs = Math.abs(numericAmount).toFixed(2);

		if (isTransfer) {
			Promise.all([
				meta.createMutation.mutateAsync({ data: { source_wallet_id: walletId, amount: `-${abs}` } }),
				meta.createMutation.mutateAsync({ data: { source_wallet_id: toWalletId, amount: abs } }),
			]).then(() => { setAmount(''); }).catch((error: unknown) => { console.error(error); });
			return;
		}

		const signed = type === 'income' ? abs : `-${abs}`;
		createTransaction({ source_wallet_id: walletId, amount: signed });
		setAmount('');
	};

	return (
		<FinanceCard className={cn("p-4", className)}>
			<div className="mb-3 flex items-center gap-2">
				<span className="flex-1 text-sm font-semibold">Quick add</span>
				<span className="font-numeric text-[10px] text-text-3">SIMPLE</span>
			</div>

			<FinanceSegmented value={type} onValueChange={(value) => { if (value) setType(value as QuickAddType); }} className="mb-3.5 w-full">
				{TYPE_OPTIONS.map((option) => (
					<FinanceSegmentedItem key={option.key} value={option.key} accent className="flex-1">
						{option.label}
					</FinanceSegmentedItem>
				))}
			</FinanceSegmented>

			<div className="mb-2.5 flex items-center gap-2 rounded-[var(--radius-md)] border border-border-strong px-3.5 py-2.5">
				{isTransfer ? (
					<TransferGlyph className={signColor} />
				) : (
					<span className={cn("font-display text-2xl", signColor)}>{type === 'income' ? '+' : '−'}</span>
				)}
				<span className={cn("font-display text-3xl font-semibold", signColor)}>{currencySymbol(currency)}</span>
				<input
					value={amount}
					onChange={(event) => { setAmount(sanitizeAmountInput(event.target.value)); }}
					inputMode="decimal"
					placeholder="0.00"
					className={cn("w-full min-w-0 flex-1 border-none bg-transparent p-0 font-display text-3xl font-semibold outline-none placeholder:text-[var(--text-3)]", signColor)}
				/>
			</div>

			{isTransfer ? (
				<div className={walletFieldClass}>
					<FromIcon className="flex-none text-text-3" />
					<select
						value={walletId}
						onChange={(event) => { setWalletId(event.target.value); }}
						className={innerSelectClass}
					>
						{wallets.map((wallet) => (
							<option key={wallet.id} value={wallet.id}>{wallet.name} · {wallet.balance.currency}</option>
						))}
					</select>
				</div>
			) : (
				<select
					value={walletId}
					onChange={(event) => { setWalletId(event.target.value); }}
					className={cn(walletSelectClass, "w-full")}
				>
					{wallets.length === 0 ? <option value="">No wallets yet</option> : null}
					{wallets.map((wallet) => (
						<option key={wallet.id} value={wallet.id}>{wallet.name} · {wallet.balance.currency}</option>
					))}
				</select>
			)}

			{isTransfer ? (
				<div className={cn(walletFieldClass, "mt-2")}>
					<ToIcon className="flex-none text-text-3" />
					<select
						value={toWalletId}
						onChange={(event) => { setToWalletId(event.target.value); }}
						className={innerSelectClass}
					>
						{wallets.filter((wallet) => wallet.id !== walletId).map((wallet) => (
							<option key={wallet.id} value={wallet.id}>{wallet.name} · {wallet.balance.currency}</option>
						))}
					</select>
				</div>
			) : null}

			<FinanceButton size="lg" className="mt-3.5 w-full" disabled={!canSubmit} onClick={onAdd}>
				{meta.createMutation.isPending ? 'Adding…' : `Add ${type}`}
			</FinanceButton>

			<Link to={getFinanceRoute('management')} className="mt-2.5 block text-center text-xs text-text-3">
				Need to scan a receipt or edit? <span className="font-semibold text-primary">Open Management →</span>
			</Link>
		</FinanceCard>
	);
};

QuickAddPanel.displayName = 'QuickAddPanel';

export { QuickAddPanel };
