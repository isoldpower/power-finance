// Cross-cutting transaction-entry presentation, shared by the dashboard quick-add widget and the
// management add-transaction form (which live in different widget domains).
type TransactionEntryType = 'expense' | 'income' | 'transfer';

const TRANSACTION_TYPE_TONE: Record<TransactionEntryType, string> = {
	expense: 'text-neg',
	income: 'text-pos',
	transfer: 'text-primary',
};

const TRANSACTION_TYPE_OPTIONS: { key: TransactionEntryType; label: string }[] = [
	{ key: 'expense', label: 'Expense' },
	{ key: 'income', label: 'Income' },
	{ key: 'transfer', label: 'Transfer' },
];

export { TRANSACTION_TYPE_TONE, TRANSACTION_TYPE_OPTIONS };
export type { TransactionEntryType };
