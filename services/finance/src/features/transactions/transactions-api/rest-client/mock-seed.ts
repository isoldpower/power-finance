import { CategoryCatalogMock } from "@feature/categories/categories-api";

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
	category_id?: string | null;
	category?: string | null;
	chain_id: string | null;
	chain_size?: number;
	evidence: { url: string } | null;
}

const isSettled = (transaction: StoredTransaction): boolean => transaction.deleted_at === null;

const walletDelta = (transaction: StoredTransaction): number => {
	const amount = Number.parseFloat(transaction.amount);
	const value = Number.isNaN(amount) ? 0 : amount;

	return transaction.type === 'income' ? value : -value;
};

const storedCategoryId = (transaction: StoredTransaction, catalog: CategoryCatalogMock): string | null => (
	transaction.category_id === undefined
		? catalog.builtInIdByName('transaction', transaction.category)
		: transaction.category_id
);

const storedTransactionToDto = (
	transaction: StoredTransaction,
	catalog: CategoryCatalogMock = new CategoryCatalogMock(),
): TransactionDto => ({
	id: transaction.id,
	name: transaction.name,
	created_at: transaction.created_at,
	updated_at: transaction.updated_at,
	deleted_at: transaction.deleted_at,
	money: { amount: transaction.amount, currency: transaction.currency },
	type: transaction.type,
	origin: transaction.origin,
	wallet: { id: transaction.wallet_id, name: transaction.wallet_name },
	category: catalog.refOf(storedCategoryId(transaction, catalog)),
	chain: transaction.chain_id
		? { id: transaction.chain_id, size: transaction.chain_size ?? 1 }
		: null,
});

export { TRANSACTIONS_STORAGE_KEY, isSettled, storedCategoryId, storedTransactionToDto, walletDelta };
export type { StoredTransaction };
