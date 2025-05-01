import type { Transaction } from "src/entities/transaction";
import type { ITransactionsRESTApiClient } from "../rest-client";
import type { TransactionPutRequest } from "../rest-client/types.ts";
import { transactionDetailedResponseToFlat } from "../mutators/api-to-flat.ts";

interface ReplaceTransactionRequest {
	handler: Pick<ITransactionsRESTApiClient, 'put'>
	payload: TransactionPutRequest
}

type ReplaceTransactionResponse = Transaction & {};

async function replaceTransaction(
	request: ReplaceTransactionRequest
): Promise<ReplaceTransactionResponse> {
	return request.handler.put(request.payload)
		.then(transactionDetailedResponseToFlat);
}

export { replaceTransaction };
export type { ReplaceTransactionRequest, ReplaceTransactionResponse };