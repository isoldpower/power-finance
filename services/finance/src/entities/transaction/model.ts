type TransactionType = 'expense' | 'income' | 'transfer' | 'adjust';

interface TransferTransactionData {
	amount: number;
	from: string;
	to: string;
	description?: string;
}

interface ExpenseTransactionData {
	amount: number;
	from: string;
	description?: string;
}

interface IncomeTransactionData {
	amount: number;
	to: string;
	description?: string;
}

interface AdjustTransactionData {
	amount: number;
	to: string;
	description?: string;
}

type Transaction = {
	id: string;
	createdAt: string;
} & (
	(TransferTransactionData & { type: 'transfer' }) |
	(ExpenseTransactionData & { type: 'expense' }) |
	(IncomeTransactionData & { type: 'income' }) |
	(AdjustTransactionData & { type: 'adjust' }) |
	({ type: never })
)

type PossibleTransactionData =
	(TransferTransactionData & { type: 'transfer' }) |
	(ExpenseTransactionData & { type: 'expense' }) |
	(IncomeTransactionData & { type: 'income' }) |
	(AdjustTransactionData & { type: 'adjust' });

export type {
	Transaction,
	TransactionType,
	TransferTransactionData,
	PossibleTransactionData,
	ExpenseTransactionData,
	IncomeTransactionData,
	AdjustTransactionData
};