import { categoryFromApi } from "../mutators";

import type { TransactionCategory } from "@entity/transactions";
import type { ITransactionsRESTApiClient } from "../rest-client";


interface ListCategoriesRequest {
	handler: Pick<ITransactionsRESTApiClient, 'listCategories'>;
}

interface ListCategoriesResponse {
	categories: TransactionCategory[];
}

async function listCategories(request: ListCategoriesRequest): Promise<ListCategoriesResponse> {
	const response = await request.handler.listCategories({ 
		params: {},
	});

	return { 
		categories: response.data.map(categoryFromApi)
	};
}

export { listCategories };
export type { ListCategoriesRequest, ListCategoriesResponse };
