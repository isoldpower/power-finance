import { MAX_PAGE_LIMIT, pageFromMeta } from "@internal/shared";
import { categoryFromApi } from "../mutators";

import type { Page } from "@internal/shared";
import type { Category, CategoryKind } from "@entity/categories";
import type { CategoryDto } from "../types.ts";
import type { ICategoriesRESTApiClient } from "../rest-client";


interface ListCategoriesRequest {
	handler: Pick<ICategoriesRESTApiClient, 'list'>;
	kind?: CategoryKind;
}

interface ListCategoriesResponse {
	page: Page<Category>;
}

async function listCategories(request: ListCategoriesRequest): Promise<ListCategoriesResponse> {
	const collected: CategoryDto[] = [];
	let cursor: string | undefined;

	do {
		const response = await request.handler.list({
			params: {
				limit: MAX_PAGE_LIMIT,
				...(request.kind === undefined ? {} : { kind: request.kind }),
				...(cursor === undefined ? {} : { cursor }),
			},
		});

		collected.push(...response.data);
		cursor = response.meta.next_cursor ?? undefined;
	} while (cursor !== undefined);

	const items = collected.map(categoryFromApi);

	return {
		page: pageFromMeta(items, {
			limit: items.length,
			total: items.length,
			next_cursor: null,
			prev_cursor: null,
		}),
	};
}

export { listCategories };
export type { ListCategoriesRequest, ListCategoriesResponse };
