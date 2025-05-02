import type { Wallet } from "@entity/wallet";

type TransactionType = 'expense' | 'income' | 'transfer' | 'adjust';

interface TransferTransactionData {
	amount: number;
	from: Wallet;
	to: Wallet;
	description?: string;
}

interface ExpenseTransactionData {
	amount: number;
	from: Wallet;
	description?: string;
}

interface IncomeTransactionData {
	amount: number;
	to: Wallet;
	description?: string;
}

interface AdjustTransactionData {
	amount: number;
	to: Wallet;
	description?: string;
}

type Transaction = {
	id: string;
	createdAt: string;
	from?: Wallet;
	to?: Wallet;
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
	TransactionType,
	TransferTransactionData,
	PossibleTransactionData,
	ExpenseTransactionData,
	IncomeTransactionData,
	AdjustTransactionData
};