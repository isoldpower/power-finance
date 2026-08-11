import type { ITransactionsRESTApiClient } from "../rest-client/types.ts";
import type { CategoryDto } from "../types.ts";


interface ListCategoriesRequest {
	handler: Pick<ITransactionsRESTApiClient, 'listCategories'>;
}

interface ListCategoriesResponse {
	data: CategoryDto[];
}

async function listCategories(request: ListCategoriesRequest): Promise<ListCategoriesResponse> {
	return request.handler.listCategories({ params: {} });
}

export { listCategories };
export type { ListCategoriesRequest, ListCategoriesResponse };
