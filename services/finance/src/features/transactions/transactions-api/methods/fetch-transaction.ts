import type { TransactionDto } from "@entity/transactions";
import type { ITransactionsRESTApiClient } from "../rest-client";
import type { TransactionGetRequest } from "../rest-client/types.ts";
import { transactionDetailedResponseToFlat } from "../mutators/api-to-flat.ts";

interface FetchTransactionRequest {
	handler: Pick<ITransactionsRESTApiClient, 'get'>
	payload: TransactionGetRequest
}

type FetchTransactionResponse = TransactionDto & {}

async function fetchTransaction(
	request: FetchTransactionRequest
): Promise<FetchTransactionResponse> {
	return request.handler.get(request.payload).then(transactionDetailedResponseToFlat);
}

export { fetchTransaction };
export type { FetchTransactionRequest, FetchTransactionResponse };