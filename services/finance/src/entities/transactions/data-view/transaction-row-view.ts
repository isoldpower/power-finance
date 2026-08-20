import {
	ledgerSideLabel,
	transactionKindLabel,
	transactionOriginLabel,
	UNCATEGORIZED_LABEL,
} from "../visual-map";

import type { Transaction, TransactionPosting } from "../types.ts";
import type { LedgerEntryView, TransactionRowView } from "./types.ts";
import type { FormatMoney } from "@shared/formatting";


const toLedgerEntryView = (
	entry: TransactionPosting,
	formatMoney: FormatMoney
): LedgerEntryView => ({
	label: ledgerSideLabel(entry.debit),
	account: entry.title,
	debit: entry.debit,
	amount: formatMoney(entry.money.amount, entry.money.currency),
});

const toLedgerEntryViews = (
	entries: TransactionPosting[],
	formatMoney: FormatMoney
): LedgerEntryView[] => entries.map((entry) => toLedgerEntryView(entry, formatMoney));

const toTransactionRowView = (
	transaction: Transaction
): TransactionRowView => {
	const created = new Date(transaction.createdAt);
	const amount = transaction.money.amount;

	return {
		id: transaction.id,
		amount,
		signedAmount: transaction.type === 'expense' ? -amount : amount,
		currency: transaction.money.currency,
		type: transaction.type,
		walletId: transaction.wallet.id,
		walletName: transaction.wallet.name,
		createdAt: transaction.createdAt,
		date: created.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
		time: created.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
		category: transaction.category ?? UNCATEGORIZED_LABEL,
		description: transaction.name || transactionKindLabel(transaction.type),
		scanned: transaction.origin === 'scanned',
		kind: transactionKindLabel(transaction.type),
		provenance: `${transactionOriginLabel(transaction.origin)} · ${created.toLocaleString()}`,
	};
};

const toTransactionRowViews = (
	transactions: Transaction[]
): TransactionRowView[] => {
	return transactions.map((transaction) => toTransactionRowView(transaction));
};

export { toTransactionRowView, toTransactionRowViews, toLedgerEntryViews };
