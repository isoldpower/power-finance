import { categoryDraftToApi, categoryFromApi } from "../mutators";

import type { Category, CategoryDraft } from "@entity/categories";
import type { ICategoriesRESTApiClient } from "../rest-client";


interface CreateCategoryRequest {
	handler: Pick<ICategoriesRESTApiClient, 'post'>;
	draft: CategoryDraft;
	idempotencyKey: string;
}

interface CreateCategoryResponse {
	category: Category;
	replayed: boolean;
}

async function createCategory(request: CreateCategoryRequest): Promise<CreateCategoryResponse> {
	const response = await request.handler.post({
		data: categoryDraftToApi(request.draft),
		idempotencyKey: request.idempotencyKey,
	});

	return {
		category: categoryFromApi(response.data),
		replayed: response.meta.idempotent_replay ?? false,
	};
}

export { createCategory };
export type { CreateCategoryRequest, CreateCategoryResponse };
