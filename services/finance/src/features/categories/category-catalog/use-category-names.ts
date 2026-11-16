import { useMemo } from "react";
import { useCategories } from "../data-presenters";

import type { CategoryKind } from "@entity/categories";


const useCategoryNames = (kind: CategoryKind): Map<string, string> => {
	const { categories } = useCategories(kind);

	return useMemo(() => {
		return new Map(categories.map((category) => [category.id, category.name]));
	}, [categories]);
};

export { useCategoryNames };
