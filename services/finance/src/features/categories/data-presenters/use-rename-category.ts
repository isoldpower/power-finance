import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { renameCategory } from "../categories-api";
import { CATEGORIES_CACHE_KEYS } from "./cache-config.ts";
import { useOptimisticCategories } from "./optimistic";

import type { UseMutationResult } from "@tanstack/react-query";
import type { CategoryPatch } from "@entity/categories";
import type { RenameCategoryResponse } from "../categories-api";
import type { CategoryCachesSnapshot } from "./optimistic";


const useRenameCategory = (id: string): UseMutationResult<
	RenameCategoryResponse,
	Error,
	CategoryPatch,
	CategoryCachesSnapshot
> => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const optimistic = useOptimisticCategories();

	return useMutation<RenameCategoryResponse, Error, CategoryPatch, CategoryCachesSnapshot>({
		mutationKey: [CATEGORIES_CACHE_KEYS.rename, id],
		mutationFn: (patch) => renameCategory({
			handler: apiContext.categoryServers.rest,
			id,
			patch,
		}),
		onMutate: async (patch) => {
			const snapshot = await optimistic.capture();
			optimistic.applyPatch(id, patch);

			return snapshot;
		},
		onError: (_error, _patch, snapshot) => {
			optimistic.restore(snapshot);
		},
		onSuccess: (category) => {
			optimistic.applySettled(id, category);
		},
		onSettled: () => {
			for (const key of DERIVED_KEYS.onCategoryChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useRenameCategory };
