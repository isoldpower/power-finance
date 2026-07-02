import { transactionDetailedResponseToFlat } from "../mutators/api-to-flat.ts";
import type { TransactionDto } from "@entity/transactions";
import type { ITransactionsRESTApiClient } from "../rest-client";
import type { TransactionPostRequest } from "../rest-client/types.ts";


interface CreateTransactionRequest {
	handler: Pick<ITransactionsRESTApiClient, 'post'>
	payload: TransactionPostRequest
}

type CreateTransactionResponse = TransactionDto & {
}

async function createTransaction(
	request: CreateTransactionRequest
): Promise<CreateTransactionResponse> {
	return request.handler.post(request.payload)
		.then(transactionDetailedResponseToFlat);
}

export { createTransaction };
export type { CreateTransactionRequest, CreateTransactionResponse };