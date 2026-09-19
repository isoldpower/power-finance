import { addAmounts, ZERO_AMOUNT } from "@shared/api";
import { roundToCurrency } from "@shared/formatting";
import { toTransactionRowViews } from "./transaction-row-view.ts";

import type { Transaction } from "../types.ts";
import type { ConvertMoney, TransactionDayView, TransactionRowView } from "./types.ts";


const toDayLabel = (dayKey: string): string => {
	return new Date(dayKey).toLocaleDateString(undefined, {
		weekday: 'long',
		month: 'short',
		day: 'numeric',
	});
};

const sumInTargetCurrency = (transactions: TransactionRowView[], convert: ConvertMoney): string => {
	return transactions.reduce((total, transaction) => {
		const converted = convert({ 
			amount: transaction.signedAmount,
			currency: transaction.currency,
		});

		return addAmounts(
			total,
			roundToCurrency(converted.amount, converted.currency),
		);
	}, ZERO_AMOUNT);
};

const toTransactionDayView = (
	dayKey: string,
	transactions: Transaction[],
	convert: ConvertMoney
): TransactionDayView => {
	const rows = toTransactionRowViews(transactions);

	return {
		dayLabel: toDayLabel(dayKey),
		dayTotal: sumInTargetCurrency(rows, convert),
		transactions: rows,
	};
};

export { toTransactionDayView };
