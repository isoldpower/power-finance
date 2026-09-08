import { transactionFromApi } from "../mutators";

import type { Transaction } from "@entity/transactions";
import type { ITransactionsRESTApiClient } from "../rest-client";


interface AdjustTransactionRequest {
	handler: Pick<ITransactionsRESTApiClient, 'adjust'>;
	id: string;
	amount: string;
	idempotencyKey: string;
}

interface AdjustTransactionResponse {
	transaction: Transaction;
	replayed: boolean;
}

async function adjustTransaction(request: AdjustTransactionRequest): Promise<AdjustTransactionResponse> {
	const response = await request.handler.adjust({
		id: request.id,
		data: { amount: request.amount },
		idempotencyKey: request.idempotencyKey,
	});

	return {
		transaction: transactionFromApi(response.data),
		replayed: response.meta.idempotent_replay ?? false,
	};
}

export { adjustTransaction };
export type { AdjustTransactionRequest, AdjustTransactionResponse };
