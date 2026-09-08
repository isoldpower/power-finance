import { transactionDetailsFromApi, transactionPostingFromApi } from "../mutators";

import type { PageParams } from "@shared/api";
import type { TransactionDetails, TransactionPosting } from "@entity/transactions";
import type { ITransactionsRESTApiClient } from "../rest-client";


interface FetchTransactionRequest {
	handler: Pick<ITransactionsRESTApiClient, 'get'>;
	id: string;
	page?: PageParams;
}

interface FetchTransactionResponse {
	transaction: TransactionDetails;
	postings: TransactionPosting[];
}

async function fetchTransaction(request: FetchTransactionRequest): Promise<FetchTransactionResponse> {
	const response = await request.handler.get({ id: request.id, params: request.page });

	return {
		transaction: transactionDetailsFromApi(response.data),
		postings: response.data.postings.map(transactionPostingFromApi),
	};
}

export { fetchTransaction };
export type { FetchTransactionRequest, FetchTransactionResponse };
