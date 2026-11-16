import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { deleteCategory } from "../categories-api";
import { CATEGORIES_CACHE_KEYS } from "./cache-config.ts";
import { useOptimisticCategories } from "./optimistic";

import type { UseMutationResult } from "@tanstack/react-query";
import type { DeleteCategoryResponse } from "../categories-api";
import type { CategoryCachesSnapshot } from "./optimistic";


const useDeleteCategory = (id: string): UseMutationResult<
	DeleteCategoryResponse,
	Error,
	undefined,
	CategoryCachesSnapshot
> => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const optimistic = useOptimisticCategories();

	return useMutation<DeleteCategoryResponse, Error, undefined, CategoryCachesSnapshot>({
		mutationKey: [CATEGORIES_CACHE_KEYS.delete, id],
		mutationFn: () => deleteCategory({
			handler: apiContext.categoryServers.rest,
			id,
		}),
		onMutate: async () => {
			const snapshot = await optimistic.capture();
			optimistic.applyRemove(id);

			return snapshot;
		},
		onError: (_error, _variables, snapshot) => {
			optimistic.restore(snapshot);
		},
		onSettled: () => {
			for (const key of DERIVED_KEYS.onCategoryChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useDeleteCategory };
