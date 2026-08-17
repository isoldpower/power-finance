import { pageFromMeta } from "@shared/api";
import { ledgerEntryFromApi } from "@feature/accounts/accounts-api";
import { transactionDetailsFromApi } from "../mutators";

import type { Page, PageParams } from "@shared/api";
import type { TransactionDetails, TransactionPosting } from "@entity/transactions";
import type { ITransactionsRESTApiClient } from "../rest-client";


interface FetchTransactionRequest {
	handler: Pick<ITransactionsRESTApiClient, 'get'>;
	id: string;
	page?: PageParams;
}

interface FetchTransactionResponse {
	transaction: TransactionDetails;
	postings: Page<TransactionPosting>;
}

async function fetchTransaction(request: FetchTransactionRequest): Promise<FetchTransactionResponse> {
	const response = await request.handler.get({ id: request.id, params: request.page });

	return {
		transaction: transactionDetailsFromApi(response.data),
		postings: pageFromMeta(response.data.postings.map(ledgerEntryFromApi), response.meta.postings),
	};
}

export { fetchTransaction };
export type { FetchTransactionRequest, FetchTransactionResponse };
