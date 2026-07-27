import { transactionDetailedResponseToFlat } from "../mutators/api-to-flat.ts";
import type { TransactionDto } from "@entity/transactions";
import type { ITransactionsRESTApiClient } from "../rest-client";
import type { TransactionChainRequest } from "../rest-client/types.ts";


interface CreateTransactionChainRequest {
	handler: Pick<ITransactionsRESTApiClient, 'chain'>
	payload: TransactionChainRequest
}

interface CreateTransactionChainResponse {
	chainId: string
	transactions: TransactionDto[]
}

async function createTransactionChain(
	request: CreateTransactionChainRequest
): Promise<CreateTransactionChainResponse> {
	return request.handler.chain(request.payload).then((result) => ({
		chainId: result.chain_id,
		transactions: result.transactions.map(transactionDetailedResponseToFlat),
	}));
}

export { createTransactionChain };
export type { CreateTransactionChainRequest, CreateTransactionChainResponse };
