import {TransactionType} from "src/entities/transaction";

interface TransactionValuableFields {
	type: TransactionType
	data: object
}

interface TransactionMeta {
	createdAt: string
	id: string
}

interface TransactionDetailed {
	id: string
	type: TransactionType
	data: object
	meta: TransactionMeta
}

interface TransactionPreview {
	id: string
	type: TransactionType
	data: object
}

type TransactionMinimalPayload = TransactionValuableFields;

export type {
	TransactionDetailed,
	TransactionPreview,
	TransactionMeta,
	TransactionValuableFields,
	TransactionMinimalPayload
};