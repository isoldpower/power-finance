import type { TransactionDto, TransactionOriginDto, TransactionTypeDto } from "../types.ts";

const TRANSACTIONS_STORAGE_KEY = 'transactions-v1';

interface StoredTransaction {
	id: string;
	name: string;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
	amount: string;
	currency: string;
	type: TransactionTypeDto;
	origin: TransactionOriginDto;
	wallet_id: string;
	wallet_name: string;
	category: string | null;
	chain_id: string | null;
	evidence: { url: string } | null;
}

const isSettled = (transaction: StoredTransaction): boolean => transaction.deleted_at === null;

const walletDelta = (transaction: StoredTransaction): number => {
	const amount = Number.parseFloat(transaction.amount);
	const value = Number.isNaN(amount) ? 0 : amount;

	return transaction.type === 'income' ? value : -value;
};

const storedTransactionToDto = (transaction: StoredTransaction): TransactionDto => ({
	id: transaction.id,
	name: transaction.name,
	created_at: transaction.created_at,
	updated_at: transaction.updated_at,
	deleted_at: transaction.deleted_at,
	money: { amount: transaction.amount, currency: transaction.currency },
	type: transaction.type,
	origin: transaction.origin,
	wallet: { id: transaction.wallet_id, name: transaction.wallet_name },
	category: transaction.category,
	chain_id: transaction.chain_id,
});

export { TRANSACTIONS_STORAGE_KEY, isSettled, storedTransactionToDto, walletDelta };
export type { StoredTransaction };
