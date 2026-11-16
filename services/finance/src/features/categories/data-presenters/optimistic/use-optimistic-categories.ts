import { useCallback, useMemo } from "react";
import { useOptimisticCache } from "@shared/data";
import { patchCategory } from "./draft-category.ts";
import { CATEGORY_RESOURCE } from "./resource.ts";

import type { CachesSnapshot } from "@shared/data";
import type { Category, CategoryPatch } from "@entity/categories";


type CategoryCachesSnapshot = CachesSnapshot<Category, never>;

interface UseOptimisticCategoriesReturn {
	capture: () => Promise<CategoryCachesSnapshot>;
	restore: (snapshot: CategoryCachesSnapshot | undefined) => void;
	applyCreate: (category: Category) => void;
	applyPatch: (id: string, patch: CategoryPatch) => void;
	applyRemove: (id: string) => void;
	applySettled: (id: string, category: Category) => void;
}

const useOptimisticCategories = (): UseOptimisticCategoriesReturn => {
	const cache = useOptimisticCache(CATEGORY_RESOURCE);

	const applyCreate = useCallback((category: Category): void => {
		cache.insertPaged([category]);
	}, [cache]);

	const applyPatch = useCallback((id: string, patch: CategoryPatch): void => {
		cache.patchPaged(id, (category) => patchCategory(category, patch));
	}, [cache]);

	const applyRemove = useCallback((id: string): void => {
		cache.removePaged([id]);
	}, [cache]);

	const applySettled = useCallback((id: string, category: Category): void => {
		cache.settlePaged(id, category);
	}, [cache]);

	return useMemo(() => ({
		capture: cache.capture,
		restore: cache.restore,
		applyCreate,
		applyPatch,
		applyRemove,
		applySettled,
	}), [cache.capture, cache.restore, applyCreate, applyPatch, applyRemove, applySettled]);
};

export { useOptimisticCategories };
export type { CategoryCachesSnapshot, UseOptimisticCategoriesReturn };
