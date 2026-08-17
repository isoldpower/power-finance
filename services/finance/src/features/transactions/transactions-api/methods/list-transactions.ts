import { pageFromMeta } from "@shared/api";
import { transactionFromApi } from "../mutators";
import type { Page, PageParams } from "@shared/api";
import type { Transaction } from "@entity/transactions";
import type { ITransactionsRESTApiClient } from "../rest-client";

interface ListTransactionsRequest {
	handler: Pick<ITransactionsRESTApiClient, 'list'>;
	page?: PageParams;
}

interface ListTransactionsResponse {
	page: Page<Transaction>;
}

async function listTransactions(request: ListTransactionsRequest): Promise<ListTransactionsResponse> {
	const response = await request.handler.list({ params: request.page });

	return { page: pageFromMeta(response.data.map(transactionFromApi), response.meta) };
}

export { listTransactions };
export type { ListTransactionsRequest, ListTransactionsResponse };
