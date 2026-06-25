import type { TransactionMinimalPayload } from "../types.ts";
import { v4 as uuidv4 } from "uuid";

interface StorageTransaction {
	id: string;
	source_wallet_id: string;
	amount: string;
	currency_code: string;
	created_at: string;
}

const createTransactionFromMinimalPayload = (
	payload: TransactionMinimalPayload
): StorageTransaction => {
	return {
		id: uuidv4(),
		source_wallet_id: payload.source_wallet_id,
		amount: payload.amount,
		currency_code: '',
		created_at: new Date().toISOString(),
	};
};

export { createTransactionFromMinimalPayload };
export type { StorageTransaction };
