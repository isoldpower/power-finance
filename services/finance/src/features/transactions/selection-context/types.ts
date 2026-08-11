interface TransactionsSelection {
	selectedTransactionId: string | null;
}

interface TransactionsSelectionState extends TransactionsSelection {
	selectTransaction: (transactionId: string | null) => void;
}

export type { TransactionsSelection, TransactionsSelectionState };
