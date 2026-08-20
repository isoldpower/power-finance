import { transactionChainFromApi } from "../mutators";

import type { TransactionChain } from "@entity/transactions";
import type { ITransactionsRESTApiClient } from "../rest-client";


interface DeleteTransactionChainRequest {
	handler: Pick<ITransactionsRESTApiClient, 'deleteChain'>;
	chainId: string;
}

type DeleteTransactionChainResponse = TransactionChain;

async function deleteTransactionChain(
	request: DeleteTransactionChainRequest
): Promise<DeleteTransactionChainResponse> {
	const response = await request.handler.deleteChain({ chainId: request.chainId });

	return transactionChainFromApi(response.data);
}

export { deleteTransactionChain };
export type { DeleteTransactionChainRequest, DeleteTransactionChainResponse };
