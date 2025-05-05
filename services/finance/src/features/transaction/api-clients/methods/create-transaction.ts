import { transactionDetailedResponseToFlat } from "../mutators/api-to-flat.ts";
import type { Transaction } from "src/entities/transaction";
import type { ITransactionsRESTApiClient } from "../rest-client";
import type { TransactionPostRequest } from "../rest-client/types.ts";

interface CreateTransactionRequest {
	handler: Pick<ITransactionsRESTApiClient, 'post'>
	payload: TransactionPostRequest
}

type CreateTransactionResponse = Transaction & {
}

async function createTransaction(
	request: CreateTransactionRequest
): Promise<CreateTransactionResponse> {
	return request.handler.post(request.payload)
		.then(transactionDetailedResponseToFlat);
}

export { createTransaction };
export type { CreateTransactionRequest, CreateTransactionResponse };