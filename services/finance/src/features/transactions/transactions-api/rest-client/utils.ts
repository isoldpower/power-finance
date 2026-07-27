import type { TransactionDirection, TransactionMinimalPayload, TransactionReceipt } from "../types.ts";
import { v4 as uuidv4 } from "uuid";

interface StorageTransaction {
	id: string;
	source_wallet_id: string;
	amount: string;
	currency_code: string;
	direction: TransactionDirection;
	merchant: string;
	category: string;
	occurred_at: string;
	note: string;
	created_at: string;
	receipt?: TransactionReceipt;
}

const directionFromAmount = (amount: string): TransactionDirection => {
	return parseFloat(amount) < 0 ? 'out' : 'in';
};

const createTransactionFromMinimalPayload = (
	payload: TransactionMinimalPayload
): StorageTransaction => {
	const now = new Date().toISOString();

	return {
		id: uuidv4(),
		source_wallet_id: payload.source_wallet_id,
		amount: payload.amount,
		currency_code: '',
		direction: payload.direction ?? directionFromAmount(payload.amount),
		merchant: payload.merchant ?? '',
		category: payload.category ?? 'Uncategorized',
		occurred_at: payload.occurred_at ?? now,
		note: '',
		created_at: now,
	};
};

export { createTransactionFromMinimalPayload, directionFromAmount };
export type { StorageTransaction };
