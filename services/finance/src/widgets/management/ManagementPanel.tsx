import type { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
import {
	cn,
	FinanceButton,
	FinanceInput,
	FinanceChip,
	FinanceSegmented,
	FinanceSegmentedItem,
} from "@internal/ui-library";

import { useWalletsListMethods, useWalletsList } from "@feature/wallet";
import { useTransactionsListMethods } from "@feature/transaction";
import { currencySymbol, sanitizeAmountInput } from "@shared/utils";

import {
	MOCK_WALLETS,
	MOCK_WALLET_TYPES,
	MOCK_CURRENCIES,
	MOCK_TXN_CATEGORIES,
} from "./mock.ts";
import type { PanelMode } from "./mock.ts";

const CREDIT_TYPE = 'Credit card';

const walletSelectClass =
	"w-full cursor-pointer rounded-[var(--radius-md)] border border-border-strong bg-card px-3.5 py-2.5 text-[13px] font-semibold text-foreground outline-none";

type TransactionType = 'expense' | 'income' | 'transfer';

const TONE_TEXT: Record<TransactionType, string> = {
	expense: 'text-neg',
	income: 'text-pos',
	transfer: 'text-primary',
};

interface ManagementPanelProps {
	mode: PanelMode | null;
	onClose: () => void;
	onSwitch: (mode: PanelMode) => void;
}

const TITLES: Record<PanelMode, ReactNode> = {
	add: 'New transaction',
	scan: <span className="flex items-center gap-2">Scan receipt <span className="rounded-[4px] bg-primary px-1.5 py-0.5 font-numeric text-[9px] font-semibold text-white">AI</span></span>,
	wallet: 'New wallet',
	transfer: 'Transfer money',
	edit: 'Edit wallet',
};

const ManagementPanel: FC<ManagementPanelProps> = ({ mode, onClose, onSwitch }) => {
	if (!mode) return null;

	return (
		<>
			<div onClick={onClose} className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]" />
			<div className="fixed inset-y-0 right-0 z-[41] flex w-[440px] max-w-[92vw] flex-col border-l border-border bg-card shadow-[var(--shadow-lg)] animate-in slide-in-from-right duration-200">
				<div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
					<span className="flex-1 font-display text-[17px] font-semibold">{TITLES[mode]}</span>
					<button type="button" onClick={onClose} className="flex size-7 items-center justify-center rounded-[var(--radius-md)] border border-border-strong text-text-2 hover:bg-secondary">✕</button>
				</div>
				{mode === 'add' ? <AddForm onSwitch={onSwitch} onClose={onClose} /> : null}
				{mode === 'scan' ? <ScanForm onClose={onClose} /> : null}
				{mode === 'wallet' ? <WalletForm onClose={onClose} submitLabel="Create wallet" /> : null}
				{mode === 'edit' ? <WalletForm onClose={onClose} submitLabel="Save changes" editing /> : null}
				{mode === 'transfer' ? <TransferForm onClose={onClose} /> : null}
			</div>
		</>
	);
};

interface FooterProps {
	submitLabel: string;
	cancelLabel?: string;
	onClose: () => void;
	onSubmit?: () => void;
	submitDisabled?: boolean;
}

const Footer: FC<FooterProps> = ({ submitLabel, cancelLabel = 'Cancel', onClose, onSubmit, submitDisabled = false }) => (
	<div className="flex gap-2.5 border-t border-border px-5 py-4">
		<FinanceButton
			size="lg"
			className="flex-1 shadow-[0_4px_14px_var(--glow)]"
			disabled={submitDisabled}
			onClick={onSubmit ?? onClose}
		>
			{submitLabel}
		</FinanceButton>
		<FinanceButton size="lg" variant="outline" onClick={onClose}>{cancelLabel}</FinanceButton>
	</div>
);

const Label: FC<{ children: ReactNode }> = ({ children }) => (
	<div className="mb-1.5 text-[11.5px] text-text-3">{children}</div>
);

const TransferGlyph: FC<{ className?: string }> = ({ className }) => (
	<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
		<path d="M7 10l-4 4 4 4" />
		<path d="M3 14h13a4 4 0 0 0 4-4V6" />
	</svg>
);

const AddForm: FC<{ onSwitch: (mode: PanelMode) => void; onClose: () => void }> = ({ onSwitch, onClose }) => {
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

	const walletOptions = (excludeId?: string) =>
		wallets
			.filter((wallet) => wallet.id !== excludeId)
			.map((wallet) => (
				<option key={wallet.id} value={wallet.id}>{wallet.name} · {wallet.balance.currency}</option>
			));

	return (
		<>
			<div className="flex-1 overflow-auto p-5">
				<button
					type="button"
					onClick={() => { onSwitch('scan'); }}
					className="mb-[18px] flex w-full items-center gap-2.5 rounded-[var(--radius-md)] border border-dashed border-[var(--accent-border)] bg-[var(--accent-soft)] px-3.5 py-2.5 text-left hover:brightness-[0.98]"
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
						<TransferGlyph className={TONE_TEXT[type]} />
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

				<Label>{isTransfer ? 'From wallet' : 'Wallet'}</Label>
				<select value={fromId} onChange={(event) => { setFromId(event.target.value); }} className={cn(walletSelectClass, isTransfer ? "mb-2" : "mb-3.5")}>
					{wallets.length === 0 ? <option value="">No wallets yet</option> : null}
					{walletOptions()}
				</select>

				{isTransfer ? (
					<>
						<div className="my-1 flex justify-center">
							<span className="flex size-[30px] items-center justify-center rounded-full border border-border bg-secondary text-[15px] text-primary">↓</span>
						</div>
						<Label>To wallet</Label>
						<select value={toId} onChange={(event) => { setToId(event.target.value); }} className={cn(walletSelectClass, "mb-1")}>
							{walletOptions(fromId).length === 0 ? <option value="">Add another wallet</option> : null}
							{walletOptions(fromId)}
						</select>
						{toId === fromId && wallets.length > 1 ? (
							<div className="mt-1 text-[11.5px] text-neg">Choose a different destination wallet.</div>
						) : null}
					</>
				) : (
					<>
						<Label>Category</Label>
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
			<Footer
				submitLabel={meta.createMutation.isPending ? 'Saving…' : isTransfer ? 'Send transfer' : 'Save transaction'}
				onClose={onClose}
				onSubmit={onSubmit}
				submitDisabled={!canSubmit}
			/>
		</>
	);
};

// TODO wire to backend
const SCAN_FIELDS = [
	{ label: 'Merchant', value: 'Whole Foods Market', ai: true },
	{ label: 'Date', value: 'Jun 18, 2026', ai: true },
	{ label: 'Category', value: 'Groceries', ai: true },
	{ label: 'Wallet', value: 'Main Checking', ai: false },
];

const ScanForm: FC<{ onClose: () => void }> = ({ onClose }) => (
	<>
		<div className="flex-1 overflow-auto p-5">
			<div className="mb-5 flex gap-4">
				<div className="relative w-[118px] flex-none overflow-hidden rounded-[10px] border border-border bg-[#f7f5ef] shadow-[var(--shadow)]">
					<div className="fx-scanline pointer-events-none absolute inset-x-0 z-10 h-0.5 bg-primary shadow-[0_0_10px_2px_var(--glow)]" />
					<div className="px-2.5 py-3 font-numeric text-[#3a382f]">
						<div className="text-center text-[8px] font-semibold tracking-[0.1em]">WHOLE FOODS</div>
						<div className="mb-1.5 text-center text-[6px] opacity-60">MARKET · SF</div>
						<div className="my-1 h-px bg-[#d8d4c6]" />
						<div className="my-0.5 flex justify-between text-[6.5px]"><span>Bananas</span><span>3.20</span></div>
						<div className="my-0.5 flex justify-between text-[6.5px]"><span>Oat milk</span><span>5.49</span></div>
						<div className="my-0.5 flex justify-between text-[6.5px]"><span>Sourdough</span><span>6.00</span></div>
						<div className="my-1 h-px bg-[#d8d4c6]" />
						<div className="flex justify-between text-[8px] font-semibold"><span>TOTAL</span><span>86.40</span></div>
					</div>
				</div>
				<div className="flex-1">
					<div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-pos-soft px-2.5 py-1 text-[11.5px] font-semibold text-pos">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
						Extracted
					</div>
					<div className="text-[12.5px] leading-relaxed text-text-2">AI read this receipt and pre-filled the fields below. <span className="text-text-3">Review before saving.</span></div>
				</div>
			</div>
			<div className="mb-3.5 flex items-center justify-between rounded-[var(--radius-md)] border-[1.5px] border-primary px-4 py-3.5 shadow-[0_0_0_3px_var(--accent-soft)]">
				<div>
					<div className="font-numeric text-[10.5px] uppercase tracking-[0.1em] text-text-3">Amount</div>
					<div className="font-display text-3xl font-semibold text-neg">−$86.40</div>
				</div>
				<span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[10px] text-primary">98% sure</span>
			</div>
			{SCAN_FIELDS.map((field) => (
				<div key={field.label} className="flex items-center gap-3 border-b border-border py-2.5">
					<span className="w-24 text-[11.5px] text-text-3">{field.label}</span>
					<span className="flex flex-1 items-center gap-2 text-[13.5px] font-semibold">
						{field.value}
						{field.ai ? <span className="rounded-[4px] border border-[var(--accent-border)] px-1 font-numeric text-[8.5px] font-semibold text-primary">AI</span> : null}
					</span>
					<span className="cursor-pointer text-[11px] text-text-3">edit</span>
				</div>
			))}
		</div>
		<Footer submitLabel="Save transaction" cancelLabel="Discard" onClose={onClose} />
	</>
);

// Edit mode is still a TODO (panel isn't passed the selected wallet yet); create is wired.
const WalletForm: FC<{ onClose: () => void; submitLabel: string; editing?: boolean }> = ({ onClose, submitLabel, editing = false }) => {
	const { meta } = useWalletsListMethods();
	const [name, setName] = useState(editing ? MOCK_WALLETS[0].name : '');
	const [type, setType] = useState(editing ? MOCK_WALLETS[0].type : MOCK_WALLET_TYPES[0]);
	const [currency, setCurrency] = useState(editing ? MOCK_WALLETS[0].currency : MOCK_CURRENCIES[0]);
	const [balance, setBalance] = useState('');

	const trimmedName = name.trim();
	const canSubmit = trimmedName !== '' && !meta.createMutation.isPending;

	const onSubmit = () => {
		if (editing || !canSubmit) {
			onClose();
			return;
		}
		meta.createMutation.mutate(
			{
				data: {
					name: trimmedName,
					balance: { amount: parseFloat(balance) || 0, currency },
					credit: type === CREDIT_TYPE,
				},
			},
			{ onSuccess: () => { onClose(); } }
		);
	};

	return (
		<>
			<div className="flex-1 overflow-auto p-5">
				<div
					className="mb-5 flex h-[120px] flex-col justify-between rounded-[12px] p-4 shadow-[var(--shadow-lg)]"
					style={{ background: editing ? MOCK_WALLETS[0].gradient : 'linear-gradient(135deg,#6366f1,#4f46e5)' }}
				>
					<div className="flex items-center justify-between text-white/90">
						<span className="text-xs font-semibold tracking-[0.04em]">{type}</span>
						<span className="font-numeric text-[11px] opacity-85">{currency}</span>
					</div>
					<div className="font-display text-[19px] font-semibold tracking-[-0.01em] text-white">{name || 'Wallet name'}</div>
				</div>

				<Label>Wallet name</Label>
				<FinanceInput value={name} onChange={(event) => { setName(event.target.value); }} placeholder="e.g. Travel Card" className="mb-4" />

				<Label>Type</Label>
				<FinanceSegmented value={type} onValueChange={(value) => { if (value) setType(value); }} className="mb-4 w-full">
					{MOCK_WALLET_TYPES.map((option) => (
						<FinanceSegmentedItem key={option} value={option} className="flex-1 text-[11px]">{option}</FinanceSegmentedItem>
					))}
				</FinanceSegmented>

				<Label>Currency</Label>
				<FinanceSegmented value={currency} onValueChange={(value) => { if (value) setCurrency(value); }} className="mb-4 w-full">
					{MOCK_CURRENCIES.map((option) => (
						<FinanceSegmentedItem key={option} value={option} className="flex-1">{option}</FinanceSegmentedItem>
					))}
				</FinanceSegmented>

				{editing ? (
					<div className="flex items-start gap-2.5 rounded-[var(--radius-md)] border border-border bg-secondary px-3 py-2.5">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-none">
							<rect x="3" y="11" width="18" height="11" rx="2" />
							<path d="M7 11V7a5 5 0 0 1 10 0v4" />
						</svg>
						<span className="text-[11.5px] leading-snug text-text-2">Balance is posted automatically from transactions and can’t be edited here.</span>
					</div>
				) : (
					<>
						<Label>Opening balance</Label>
						<FinanceInput value={balance} onChange={(event) => { setBalance(event.target.value); }} placeholder="0.00" />
					</>
				)}
			</div>
			<Footer
				submitLabel={meta.createMutation.isPending ? 'Creating…' : submitLabel}
				onClose={onClose}
				onSubmit={onSubmit}
				submitDisabled={!editing && !canSubmit}
			/>
		</>
	);
};

// TODO wire to backend
const TransferForm: FC<{ onClose: () => void }> = ({ onClose }) => {
	const from = MOCK_WALLETS[0];
	const [toId, setToId] = useState(MOCK_WALLETS[1].id);
	const [amount, setAmount] = useState('');
	const to = MOCK_WALLETS.find((wallet) => wallet.id === toId) ?? MOCK_WALLETS[1];

	return (
		<>
			<div className="flex-1 overflow-auto p-5">
				<Label>From</Label>
				<div className="mb-3 flex items-center gap-3 rounded-[var(--radius-md)] border border-border-strong px-3.5 py-3">
					<span className="h-[23px] w-[34px] flex-none rounded-[5px]" style={{ background: from.gradient }} />
					<div className="min-w-0 flex-1">
						<div className="text-[13.5px] font-semibold">{from.name}</div>
						<div className="text-[11px] text-text-3">{from.type} · {from.currency}</div>
					</div>
					<div className="text-right">
						<div className="text-[10px] text-text-3">Available</div>
						<div className="font-display text-[13.5px] font-semibold">{from.balance}</div>
					</div>
				</div>

				<div className="my-1.5 flex justify-center">
					<span className="flex size-[30px] items-center justify-center rounded-full border border-border bg-secondary text-[15px] text-primary">↓</span>
				</div>

				<Label>To</Label>
				<div className="mb-4 flex items-center gap-3 rounded-[var(--radius-md)] border border-border-strong px-3 py-2">
					<span className="h-[23px] w-[34px] flex-none rounded-[5px]" style={{ background: to.gradient }} />
					<select value={toId} onChange={(event) => { setToId(event.target.value); }} className="min-w-0 flex-1 cursor-pointer border-none bg-transparent text-[13.5px] font-semibold outline-none">
						{MOCK_WALLETS.filter((wallet) => wallet.id !== from.id).map((wallet) => (
							<option key={wallet.id} value={wallet.id}>{wallet.name} · {wallet.currency}</option>
						))}
					</select>
				</div>

				<Label>Amount</Label>
				<div className="mb-3 flex items-center gap-2 rounded-[var(--radius-md)] border-[1.5px] border-primary px-4 py-3.5 shadow-[0_0_0_3px_var(--accent-soft)]">
					<span className="font-display text-2xl text-text-2">$</span>
					<input value={amount} onChange={(event) => { setAmount(sanitizeAmountInput(event.target.value)); }} inputMode="decimal" placeholder="0.00" className="min-w-0 flex-1 border-none bg-transparent font-display text-3xl font-semibold outline-none placeholder:text-[var(--text-3)]" />
				</div>
				<div className="text-xs leading-snug text-text-3">Moves money from {from.name} to {to.name}. Posts a balanced transfer to the ledger.</div>
			</div>
			<Footer submitLabel="Send transfer" onClose={onClose} />
		</>
	);
};

ManagementPanel.displayName = 'ManagementPanel';

export { ManagementPanel };
export type { ManagementPanelProps };
