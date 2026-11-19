import { categoryFromApi, categoryPatchToApi } from "../mutators";

import type { Category, CategoryPatch } from "@entity/categories";
import type { ICategoriesRESTApiClient } from "../rest-client";


interface RenameCategoryRequest {
	handler: Pick<ICategoriesRESTApiClient, 'patch'>;
	id: string;
	patch: CategoryPatch;
}

type RenameCategoryResponse = Category;

async function renameCategory(request: RenameCategoryRequest): Promise<RenameCategoryResponse> {
	const response = await request.handler.patch({
		id: request.id,
		data: categoryPatchToApi(request.patch),
	});

	return categoryFromApi(response.data);
}

export { renameCategory };
export type { RenameCategoryRequest, RenameCategoryResponse };
