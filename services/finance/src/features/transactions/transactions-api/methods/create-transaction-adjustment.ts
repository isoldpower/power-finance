import { transactionAdjustmentToApi, transactionChainFromApi, transactionDraftToApi } from "../mutators";

import type { Transaction, TransactionChain, TransactionDraft } from "@entity/transactions";
import type { ITransactionsRESTApiClient, TransactionChainResponse } from "../rest-client";


interface CreateTransactionAdjustmentRequest {
	handler: Pick<ITransactionsRESTApiClient, 'postChain' | 'appendChain'>;
	adjusted: Pick<Transaction, 'id' | 'chain'>;
	draft: TransactionDraft;
	idempotencyKey: string;
}

interface CreateTransactionAdjustmentResponse {
	chain: TransactionChain;
	replayed: boolean;
}

const requestAdjustment = (request: CreateTransactionAdjustmentRequest): Promise<TransactionChainResponse> => {
	const { handler, adjusted, draft, idempotencyKey } = request;

	return adjusted.chain
		? handler.appendChain({ chainId: adjusted.chain.id, data: transactionDraftToApi(draft), idempotencyKey })
		: handler.postChain({ data: transactionAdjustmentToApi(adjusted.id, draft), idempotencyKey });
};

async function createTransactionAdjustment(
	request: CreateTransactionAdjustmentRequest
): Promise<CreateTransactionAdjustmentResponse> {
	const response = await requestAdjustment(request);

	return {
		chain: transactionChainFromApi(response.data),
		replayed: response.meta.idempotent_replay ?? false,
	};
}

export { createTransactionAdjustment };
export type { CreateTransactionAdjustmentRequest, CreateTransactionAdjustmentResponse };
