import { transactionPreviewResponseToFlat } from "../mutators/api-to-flat.ts";
import type { Transaction } from "src/entities/transaction";
import type { ITransactionsRESTApiClient } from "../rest-client";

interface ListAllTransactionsRequest {
	handler: Pick<ITransactionsRESTApiClient, 'list'>;
}

interface ListAllTransactionsResponse {
	data: Transaction[];
	meta: {
		limit: number
		offset: number
		total: number
	}
}

async function listAllTransactions(
	request: ListAllTransactionsRequest
): Promise<ListAllTransactionsResponse> {
	return request.handler.list({
		params: {}
	}).then(transactions => ({
		data: transactions.data.map(transactionPreviewResponseToFlat),
		meta: transactions.meta
	}))
}

export { listAllTransactions };
export type { ListAllTransactionsRequest, ListAllTransactionsResponse };