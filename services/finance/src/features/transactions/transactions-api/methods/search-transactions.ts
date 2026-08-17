import { pageFromMeta } from "@shared/api";
import { transactionFromApi, transactionQueryToApi } from "../mutators";
import type { Page, PageParams, SearchOrder } from "@shared/api";
import type { Transaction, TransactionQuery } from "@entity/transactions";
import type { ITransactionsRESTApiClient } from "../rest-client";

interface SearchTransactionsRequest {
	handler: Pick<ITransactionsRESTApiClient, 'search'>;
	query: TransactionQuery;
	order?: SearchOrder;
	page?: PageParams;
}

interface SearchTransactionsResponse {
	page: Page<Transaction>;
}

async function searchTransactions(request: SearchTransactionsRequest): Promise<SearchTransactionsResponse> {
	const response = await request.handler.search({
		data: transactionQueryToApi(request.query),
		params: { ...request.page, order: request.order },
	});

	return { page: pageFromMeta(response.data.map(transactionFromApi), response.meta) };
}

export { searchTransactions };
export type { SearchTransactionsRequest, SearchTransactionsResponse };
