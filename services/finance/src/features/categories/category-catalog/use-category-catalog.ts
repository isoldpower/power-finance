import { useMemo } from "react";
import { useCategories } from "../data-presenters";

import type { Category, CategoryKind } from "@entity/categories";
import type { UseCategoriesReturn } from "../data-presenters";


interface UseCategoryCatalogReturn {
	builtInCategories: Category[];
	ownCategories: Category[];
	status: UseCategoriesReturn['status'];
}

const useCategoryCatalog = (kind: CategoryKind): UseCategoryCatalogReturn => {
	const { categories, status } = useCategories(kind);

	return useMemo(() => ({
		builtInCategories: categories.filter((category) => category.isGlobal),
		ownCategories: categories.filter((category) => !category.isGlobal),
		status,
	}), [categories, status]);
};

export { useCategoryCatalog };
export type { UseCategoryCatalogReturn };
