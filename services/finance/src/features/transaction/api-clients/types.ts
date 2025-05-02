import type { Transaction, TransactionType } from "@entity/transaction";
import type { Wallet } from "@entity/wallet";

interface TransactionValuableFields {
	type: TransactionType
	data: Omit<TransactionData, 'from' | 'to' | 'id' | 'createdAt'> & {
		from?: string;
		to?: string;
	}
}

interface TransactionMeta {
	createdAt: string
	id: string
}

interface TransactionData {
	id: string;
	createdAt: string;
	from?: Wallet;
	to?: Wallet;
	description?: string;
	amount?: number;
}

interface TransactionDetailed {
	id: string
	type: TransactionType
	data: TransactionData
	meta: TransactionMeta
}

interface TransactionPreview {
	id: string
	type: TransactionType
	data: TransactionData
	meta: TransactionMeta
}

type TransactionMinimalPayload = TransactionValuableFields;


type StorageTransaction = Omit<Transaction, 'from' | 'to'> & {
	from?: string;
	to?: string;
}

export type {
	TransactionDetailed,
	TransactionPreview,
	TransactionMeta,
	TransactionValuableFields,
	TransactionMinimalPayload,
	StorageTransaction
};