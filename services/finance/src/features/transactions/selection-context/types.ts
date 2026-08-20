interface TransactionsSelection {
	selectedTransactionId: string | null;
	checkedTransactionIds: string[];
}

interface TransactionsSelectionState extends TransactionsSelection {
	selectTransaction: (transactionId: string | null) => void;
	toggleChecked: (transactionId: string) => void;
	clearChecked: () => void;
}

export type { TransactionsSelection, TransactionsSelectionState };
