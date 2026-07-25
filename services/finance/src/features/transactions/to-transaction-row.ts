import { toneFromAmount, iconClassFromAmount, iconFromAmount } from "@entity/transactions";
import type { TransactionPreviewDto, TransactionRowView } from "@entity/transactions";

import type { WalletRef } from "./types.ts";


const toTransactionRow = (
	dto: TransactionPreviewDto,
	walletById: Map<string, WalletRef>,
	formatMoney: (amount: number, currency: string) => string
): TransactionRowView => {
	const amount = parseFloat(dto.amount);
	const created = new Date(dto.created_at);
	const wallet = walletById.get(dto.source_wallet.id);
	const walletName = wallet?.name ?? 'Unknown wallet';
	const currency = wallet?.currency ?? (dto.currency_code || 'USD');
	const absFormatted = formatMoney(Math.abs(amount), currency);
	const isIncome = amount >= 0;

	return {
		id: dto.id,
		amount,
		currency,
		walletId: dto.source_wallet.id,
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

export { toTransactionRow };
