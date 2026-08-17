import { v4 as uuidv4 } from "uuid";

import { transactionChainDraftToApi, transactionChainFromApi } from "../mutators";
import type { TransactionChain, TransactionChainDraft } from "@entity/transactions";
import type { ITransactionsRESTApiClient } from "../rest-client";

interface CreateTransactionChainRequest {
	handler: Pick<ITransactionsRESTApiClient, 'postChain'>;
	draft: TransactionChainDraft;
	idempotencyKey?: string;
}

interface CreateTransactionChainResponse {
	chain: TransactionChain;
	replayed: boolean;
}

async function createTransactionChain(
	request: CreateTransactionChainRequest
): Promise<CreateTransactionChainResponse> {
	const response = await request.handler.postChain({
		data: transactionChainDraftToApi(request.draft),
		idempotencyKey: request.idempotencyKey ?? uuidv4(),
	});

	return {
		chain: transactionChainFromApi(response.data),
		replayed: response.meta.idempotent_replay ?? false,
	};
}

export { createTransactionChain };
export type { CreateTransactionChainRequest, CreateTransactionChainResponse };
