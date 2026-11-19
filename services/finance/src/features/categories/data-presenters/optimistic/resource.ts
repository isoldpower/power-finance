import { CATEGORIES_CACHE_KEYS } from "../cache-config.ts";

import type { QueryKey } from "@tanstack/react-query";
import type { OptimisticResource } from "@shared/data";
import type { Category } from "@entity/categories";


const ANY_KIND = 'any';

const belongsToKind = (
	key: QueryKey,
	category: Category
): boolean => {
	const [, kind] = key;

	return kind === ANY_KIND || kind === category.kind;
};

const CATEGORY_RESOURCE: OptimisticResource<Category, never, never> = {
	paged: [{
		key: CATEGORIES_CACHE_KEYS.list,
		accepts: belongsToKind 
	}],
};

export { ANY_KIND, CATEGORY_RESOURCE };
