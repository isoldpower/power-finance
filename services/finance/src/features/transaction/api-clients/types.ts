import type { TransactionType } from "@entity/transaction";
import type { Wallet } from "@entity/wallet";

interface TransactionSide {
	wallet: string;
	amount: number;
}

interface TransactionSideDetailed {
	wallet: Wallet;
	amount: number;
}

interface TransactionData {
	id: string;
	createdAt: string;
	from?: TransactionSideDetailed;
	to?: TransactionSideDetailed;
	description?: string;
}

interface TransactionValuableFields {
	from?: TransactionSide;
	to?: TransactionSide;
	description?: string;
	type: TransactionType;
}

interface TransactionMeta {
	createdAt: string
	id: string
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

export type {
	TransactionDetailed,
	TransactionPreview,
	TransactionMeta,
	TransactionValuableFields,
	TransactionMinimalPayload
};