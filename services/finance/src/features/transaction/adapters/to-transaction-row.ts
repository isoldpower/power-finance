// Derive + decorate helpers mapping thin backend DTOs to the redesign's view shapes.
// Real fields (id/amount/currency/wallet/date) come from the API; visuals are derived,
// and fields the backend can't supply yet (category, double-entry lines) are placeholders.
// TODO wire to backend when richer transaction/wallet models land.

import type { TransactionPreviewDto, TransactionRowView } from "@entity/transaction";
import type { Tone } from "@shared/utils";

import type { WalletRef } from "./types.ts";

const toneFromAmount = (amount: number): Tone => (amount >= 0 ? 'pos' : 'neg');

const iconClassFromAmount = (amount: number): string =>
	amount >= 0 ? 'bg-pos-soft text-pos' : 'bg-[var(--accent-soft)] text-primary';

const iconFromAmount = (amount: number): string => (amount >= 0 ? '↓' : '↑');

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

export { toTransactionRow, toneFromAmount, iconClassFromAmount, iconFromAmount };
