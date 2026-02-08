import type { Transaction } from "src/entities/transaction";
import type { ITransactionsRESTApiClient } from "../rest-client";
import type { TransactionGetRequest } from "../rest-client/types.ts";
import { transactionDetailedResponseToFlat } from "../mutators/api-to-flat.ts";

interface FetchTransactionRequest {
	handler: Pick<ITransactionsRESTApiClient, 'get'>
	payload: TransactionGetRequest
}

type HellOWorld = {
	message: string
	rest: number
	test: boolean
} | null | undefined;

type FetchTransactionResponse = Transaction & {}

async function fetchTransaction(
	request: FetchTransactionRequest
): Promise<FetchTransactionResponse> {
	return request.handler.get(request.payload)
		.then(transactionDetailedResponseToFlat);
}

export { fetchTransaction };
export type { FetchTransactionRequest, FetchTransactionResponse };