import { toTransactionRowViews } from "./transaction-row-view.ts";

import type { TransactionPreviewDto } from "../types.ts";
import type { ConvertMoney, FormatMoney, TransactionDayView, TransactionRowView } from "./types.ts";


const toDayLabel = (dayKey: string): string => {
	return new Date(dayKey).toLocaleDateString(undefined, {
		weekday: 'long',
		month: 'short',
		day: 'numeric',
	});
};

const sumInTargetCurrency = (transactions: TransactionRowView[], convert: ConvertMoney): number => {
	return transactions.reduce((total, transaction) => {
		return total + convert({ amount: transaction.amount, currency: transaction.currency }).amount;
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
