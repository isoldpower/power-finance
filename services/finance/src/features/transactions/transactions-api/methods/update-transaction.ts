import { transactionDetailedResponseToFlat } from "../mutators/api-to-flat.ts";
import type { TransactionDto } from "@entity/transactions";
import type { ITransactionsRESTApiClient } from "../rest-client";
import type { TransactionPatchRequest } from "../rest-client";


interface UpdateTransactionRequest {
	handler: Pick<ITransactionsRESTApiClient, 'patch'>
	payload: TransactionPatchRequest
}

type UpdateTransactionResponse = TransactionDto & {}

async function updateTransaction(
	request: UpdateTransactionRequest
): Promise<UpdateTransactionResponse> {
	return request.handler.patch(request.payload)
		.then(transactionDetailedResponseToFlat);
}

export { updateTransaction };
export type { UpdateTransactionRequest, UpdateTransactionResponse };
