import type { TransactionType } from "@entity/transaction";
import type { Wallet } from "@entity/wallet";


interface TransactionSide {
	wallet_id: string;
	amount: number;
}

interface TransactionSideDetailed {
	wallet: Wallet;
	amount: number;
}

interface TransactionValuableFields {
	sender?: TransactionSide | null;
	receiver?: TransactionSide | null;
	description?: string;
	type: TransactionType;
}

interface TransactionMeta {
	created_at: string
	id: string
}

interface TransactionDetailed {
	id: string
	type: TransactionType
	description?: string
	sender?: TransactionSideDetailed | null
	receiver?: TransactionSideDetailed | null
	
	meta: TransactionMeta
}

interface TransactionPreview {
	id: string
	type: TransactionType
	description?: string
	sender?: TransactionSide | null
	receiver?: TransactionSide | null
	
	meta: TransactionMeta
}

type TransactionMinimalPayload = TransactionValuableFields;

export type {
	TransactionSide,
	TransactionSideDetailed,
	TransactionDetailed,
	TransactionPreview,
	TransactionMeta,
	TransactionValuableFields,
	TransactionMinimalPayload
};