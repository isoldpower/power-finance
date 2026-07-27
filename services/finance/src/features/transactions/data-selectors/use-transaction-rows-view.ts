import { useMemo } from "react";

import { useLocaleCurrency } from "@shared/utils";
import { toneFromAmount, iconClassFromAmount, iconFromAmount } from "@entity/transactions";
import type { TransactionPreviewDto, TransactionRowView } from "@entity/transactions";


const toTransactionRow = (
	dto: TransactionPreviewDto,
	formatMoney: (amount: number, currency: string) => string
): TransactionRowView => {
	const amount = parseFloat(dto.amount);
	const created = new Date(dto.created_at);
	const walletName = dto.source_wallet.name;
	const currency = dto.currency_code || 'USD';
	const absFormatted = formatMoney(Math.abs(amount), currency);
	const category = dto.category || 'Uncategorized';
	const isIncome = dto.direction === 'in';

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
		category,
		kind: isIncome ? 'Income' : 'Expense',
		lines: isIncome
			? [
				{ type: 'DR', account: walletName, side: 'debit', amount: absFormatted },
				{ type: 'CR', account: 'Income', side: 'credit', amount: absFormatted },
			]
			: [
				{ type: 'DR', account: category, side: 'debit', amount: absFormatted },
				{ type: 'CR', account: walletName, side: 'credit', amount: absFormatted },
			],
		provenance: `Imported · ${created.toLocaleString()}`,
	};
};

const useTransactionRowsView = (
	transactions: TransactionPreviewDto[]
): TransactionRowView[] => {
	const formatMoney = useLocaleCurrency();

	return useMemo(
		() => transactions.map((dto) => toTransactionRow(dto, formatMoney)),
		[transactions, formatMoney]
	);
};

export { useTransactionRowsView };
