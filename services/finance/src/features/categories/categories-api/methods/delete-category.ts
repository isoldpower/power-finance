import { categoryFromApi } from "../mutators";

import type { Category } from "@entity/categories";
import type { ICategoriesRESTApiClient } from "../rest-client";


interface DeleteCategoryRequest {
	handler: Pick<ICategoriesRESTApiClient, 'delete'>;
	id: string;
}

type DeleteCategoryResponse = Category;

async function deleteCategory(request: DeleteCategoryRequest): Promise<DeleteCategoryResponse> {
	const response = await request.handler.delete({ 
		id: request.id 
	});

	return categoryFromApi(response.data);
}

export { deleteCategory };
export type { DeleteCategoryRequest, DeleteCategoryResponse };
