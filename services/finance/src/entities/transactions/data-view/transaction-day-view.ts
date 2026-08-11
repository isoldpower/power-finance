import { toTransactionRowViews } from "./transaction-row-view.ts";

import type { TransactionPreviewDto } from "../types.ts";
import type { ConvertMoney, TransactionDayView, TransactionRowView } from "./types.ts";
import { roundToCurrency } from "@shared/formatting";

import type { FormatMoney } from "@shared/formatting";


const toDayLabel = (dayKey: string): string => {
	return new Date(dayKey).toLocaleDateString(undefined, {
		weekday: 'long',
		month: 'short',
		day: 'numeric',
	});
};

const sumInTargetCurrency = (transactions: TransactionRowView[], convert: ConvertMoney): number => {
	return transactions.reduce((total, transaction) => {
		const converted = convert({ amount: transaction.amount, currency: transaction.currency });

		return total + roundToCurrency(converted.amount, converted.currency);
	}, 0);
};

const toTransactionDayView = (
	dayKey: string,
	transactions: TransactionPreviewDto[],
	convert: ConvertMoney,
	formatMoney: FormatMoney
): TransactionDayView => {
	const rows = toTransactionRowViews(transactions, formatMoney);

	return {
		dayLabel: toDayLabel(dayKey),
		dayTotal: sumInTargetCurrency(rows, convert),
		transactions: rows,
	};
};

export { toTransactionDayView };
