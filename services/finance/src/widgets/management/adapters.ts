// Derive + decorate helpers mapping thin backend DTOs to the redesign's view shapes.
// Real fields (id/amount/currency/wallet/date) come from the API; visuals are derived,
// and fields the backend can't supply yet (category, double-entry lines) are placeholders.
// TODO wire to backend when richer transaction/wallet models land.

import type { Wallet } from "@entity/wallet";
import type { TransactionPreviewDto } from "@entity/transaction";
import type { Tone, MockLedgerLine } from "./mock.ts";

const GRADIENTS = [
	'linear-gradient(135deg,#4f46e5,#8b5cf6)',
	'linear-gradient(135deg,#0ca678,#1098ad)',
	'linear-gradient(135deg,#e8920c,#f76707)',
	'linear-gradient(135deg,#8b5cf6,#6366f1)',
	'linear-gradient(135deg,#1098ad,#0ca678)',
];

const hashString = (value: string): number => {
	let hash = 0;
	for (let index = 0; index < value.length; index += 1) {
		hash = (hash * 31 + value.charCodeAt(index)) | 0;
	}
	return Math.abs(hash);
};

const gradientFromId = (id: string): string => GRADIENTS[hashString(id) % GRADIENTS.length];

const walletTypeLabel = (wallet: Wallet): string => (wallet.credit ? 'Credit card' : 'Account');

const toneFromAmount = (amount: number): Tone => (amount >= 0 ? 'pos' : 'neg');

const iconClassFromAmount = (amount: number): string =>
	amount >= 0 ? 'bg-pos-soft text-pos' : 'bg-[var(--accent-soft)] text-primary';

const iconFromAmount = (amount: number): string => (amount >= 0 ? '↓' : '↑');

const relativeTime = (iso?: string): string => {
	if (!iso) return '—';
	const then = new Date(iso).getTime();
	const diffMs = Date.now() - then;
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	if (diffHours < 1) return 'just now';
	if (diffHours < 24) return `${diffHours.toString()}h ago`;
	const diffDays = Math.floor(diffHours / 24);
	if (diffDays < 7) return `${diffDays.toString()}d ago`;
	return `${Math.floor(diffDays / 7).toString()}w ago`;
};

interface TransactionRowView {
	id: string;
	amount: number;
	currency: string;
	walletId: string;
	walletName: string;
	createdAt: string;
	date: string;
	time: string;
	icon: string;
	iconClass: string;
	tone: Tone;
	category: string;
	kind: string;
	lines: MockLedgerLine[];
	provenance: string;
}

interface WalletRef {
	name: string;
	currency: string;
}

const toTransactionRow = (
	dto: TransactionPreviewDto,
	walletById: Map<string, WalletRef>,
	formatMoney: (amount: number, currency: string) => string
): TransactionRowView => {
	const amount = parseFloat(dto.amount);
	const created = new Date(dto.created_at);
	const wallet = walletById.get(dto.source_wallet_id);
	const walletName = wallet?.name ?? 'Unknown wallet';
	// The thin transaction DTO often has no currency_code; trust the wallet's currency.
	const currency = wallet?.currency ?? (dto.currency_code || 'USD');
	const absFormatted = formatMoney(Math.abs(amount), currency);
	const isIncome = amount >= 0;

	return {
		id: dto.id,
		amount,
		currency,
		walletId: dto.source_wallet_id,
		walletName,
		createdAt: dto.created_at,
		date: created.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
		time: created.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
		icon: iconFromAmount(amount),
		iconClass: iconClassFromAmount(amount),
		tone: toneFromAmount(amount),
		category: 'Uncategorized',
		kind: isIncome ? 'Income' : 'Expense',
		lines: isIncome
			? [
				{ type: 'DR', account: walletName, side: 'debit', amount: absFormatted },
				{ type: 'CR', account: 'Income', side: 'credit', amount: absFormatted },
			]
			: [
				{ type: 'DR', account: 'Uncategorized', side: 'debit', amount: absFormatted },
				{ type: 'CR', account: walletName, side: 'credit', amount: absFormatted },
			],
		provenance: `Imported · ${created.toLocaleString()}`,
	};
};

export {
	gradientFromId,
	walletTypeLabel,
	toneFromAmount,
	relativeTime,
	toTransactionRow,
};
export type { TransactionRowView, WalletRef };
