import { transactionDraftToApi, transactionFromApi } from "../mutators";

import type { Transaction, TransactionDraft } from "@entity/transactions";
import type { ITransactionsRESTApiClient } from "../rest-client";


interface CreateTransactionRequest {
	handler: Pick<ITransactionsRESTApiClient, 'post'>;
	draft: TransactionDraft;
	idempotencyKey: string;
}

interface CreateTransactionResponse {
	transaction: Transaction;
	replayed: boolean;
}

async function createTransaction(request: CreateTransactionRequest): Promise<CreateTransactionResponse> {
	const response = await request.handler.post({
		data: transactionDraftToApi(request.draft),
		idempotencyKey: request.idempotencyKey,
	});

	return {
		transaction: transactionFromApi(response.data),
		replayed: response.meta.idempotent_replay ?? false,
	};
}

export { createTransaction };
export type { CreateTransactionRequest, CreateTransactionResponse };
