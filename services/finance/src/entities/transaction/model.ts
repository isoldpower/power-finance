import type { Wallet } from "@entity/wallet";

type TransactionType = 'expense' | 'income' | 'transfer' | 'adjust';

interface TransactionSide {
	wallet: Wallet;
	amount: number;
}

interface TransferTransactionData {
	from: TransactionSide;
	to: TransactionSide;
	description?: string;
}

interface ExpenseTransactionData {
	from: TransactionSide;
	description?: string;
}

interface IncomeTransactionData {
	to: TransactionSide;
	description?: string;
}

interface AdjustTransactionData {
	to: TransactionSide;
	description?: string;
}

type Transaction = {
	id: string;
	createdAt: string;
	from?: TransactionSide;
	to?: TransactionSide;
} & (
	(TransferTransactionData & { type: 'transfer' }) |
	(ExpenseTransactionData & { type: 'expense' }) |
	(IncomeTransactionData & { type: 'income' }) |
	(AdjustTransactionData & { type: 'adjust' })
)

type PossibleTransactionData =
	(TransferTransactionData & { type: 'transfer' }) |
	(ExpenseTransactionData & { type: 'expense' }) |
	(IncomeTransactionData & { type: 'income' }) |
	(AdjustTransactionData & { type: 'adjust' });

export type {
	Transaction,
	TransactionSide,
	TransactionType,
	TransferTransactionData,
	PossibleTransactionData,
	ExpenseTransactionData,
	IncomeTransactionData,
	AdjustTransactionData
};