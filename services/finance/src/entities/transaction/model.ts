import type { Wallet } from "@entity/wallet";

type TransactionType = 'expense' | 'income' | 'transfer' | 'adjust';

interface TransactionSide {
	wallet: Wallet;
	currencyCode: string;
	amount: number;
}

interface TransactionPreviewSide {
	walletId: string;
	currencyCode: string;
	amount: number;
}

interface TransferTransactionData<T> {
	sender: T;
	receiver: T;
	description?: string;
}

interface ExpenseTransactionData<T> {
	sender: T;
	description?: string;
}

interface IncomeTransactionData<T> {
	receiver: T;
	description?: string;
}

interface AdjustTransactionData<T> {
	receiver: T;
	description?: string;
}

type TransactionDto = {
	id: string;
	createdAt: string;
	sender?: TransactionSide;
	receiver?: TransactionSide;
} & (
	(TransferTransactionData<TransactionSide> & { type: 'transfer' }) |
	(ExpenseTransactionData<TransactionSide> & { type: 'expense' }) |
	(IncomeTransactionData<TransactionSide> & { type: 'income' }) |
	(AdjustTransactionData<TransactionSide> & { type: 'adjust' })
)

type TransactionPreviewDto = {
	id: string;
	createdAt: string;
	sender?: TransactionPreviewSide;
	receiver?: TransactionPreviewSide;
} & (
	(TransferTransactionData<TransactionPreviewSide> & { type: 'transfer' }) |
	(ExpenseTransactionData<TransactionPreviewSide> & { type: 'expense' }) |
	(IncomeTransactionData<TransactionPreviewSide> & { type: 'income' }) |
	(AdjustTransactionData<TransactionPreviewSide> & { type: 'adjust' })
)

export type {
	TransactionPreviewSide,
	TransactionSide,
	TransactionDto,
	TransactionPreviewDto,
	
	TransactionType,
	TransferTransactionData,
	ExpenseTransactionData,
	IncomeTransactionData,
	AdjustTransactionData
};