import type { TransactionEntryDto, TransactionOrigin, TransactionPreviewDto } from "../types.ts";
import type { LedgerEntryView, TransactionRowView } from "./types.ts";
import type { FormatMoney } from "@shared/formatting";


const KIND_BY_DIRECTION = {
	in: 'Income',
	out: 'Expense',
};

const ORIGIN_VERBOSE: Record<TransactionOrigin, string> = {
	manual: 'Added manually',
	imported: 'Imported',
	recurring: 'Recurring rule',
};

const SIDE_LABEL = {
	debit: 'DR',
	credit: 'CR',
};

const toLedgerEntryView = (
	entry: TransactionEntryDto,
	currency: string,
	formatMoney: FormatMoney
): LedgerEntryView => ({
	label: SIDE_LABEL[entry.side],
	account: entry.account,
	side: entry.side,
	amount: formatMoney(parseFloat(entry.amount), currency),
});

const toTransactionRowView = (
	transaction: TransactionPreviewDto,
	formatMoney: FormatMoney
): TransactionRowView => {
	const created = new Date(transaction.created_at);

	return {
		id: transaction.id,
		amount: parseFloat(transaction.amount),
		currency: transaction.currency_code,
		direction: transaction.direction,
		walletId: transaction.source_wallet.id,
		walletName: transaction.source_wallet.name,
		createdAt: transaction.created_at,
		date: created.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
		time: created.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
		category: transaction.category,
		kind: KIND_BY_DIRECTION[transaction.direction],
		entries: transaction.entries.map((entry) => toLedgerEntryView(entry, transaction.currency_code, formatMoney)),
		provenance: `${ORIGIN_VERBOSE[transaction.origin]} · ${created.toLocaleString()}`,
	};
};

const toTransactionRowViews = (
	transactions: TransactionPreviewDto[],
	formatMoney: FormatMoney
): TransactionRowView[] => {
	return transactions.map((transaction) => toTransactionRowView(transaction, formatMoney));
};

export { toTransactionRowView, toTransactionRowViews };
