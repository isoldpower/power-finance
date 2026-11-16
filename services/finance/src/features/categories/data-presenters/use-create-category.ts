import { useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIdempotencyKey } from "@internal/shared";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { createCategory } from "../categories-api";
import { CATEGORIES_CACHE_KEYS } from "./cache-config.ts";
import { categoryFromDraft, optimisticCategoryId, useOptimisticCategories } from "./optimistic";

import type { UseMutationResult } from "@tanstack/react-query";
import type { CategoryDraft } from "@entity/categories";
import type { CreateCategoryResponse } from "../categories-api";
import type { CategoryCachesSnapshot } from "./optimistic";


interface CreateCategoryVariables {
	draft: CategoryDraft;
	idempotencyKey: string;
}

interface CreateCategoryContext {
	snapshot: CategoryCachesSnapshot;
	temporaryId: string;
}

type UseCreateCategoryReturn = UseMutationResult<
	CreateCategoryResponse,
	Error,
	CreateCategoryVariables,
	CreateCategoryContext
> & {
	create: (draft: CategoryDraft) => Promise<CreateCategoryResponse>;
};

const useCreateCategory = (): UseCreateCategoryReturn => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const optimistic = useOptimisticCategories();

	const mutation = useMutation<CreateCategoryResponse, Error, CreateCategoryVariables, CreateCategoryContext>({
		mutationKey: [CATEGORIES_CACHE_KEYS.create],
		mutationFn: (variables) => createCategory({
			handler: apiContext.categoryServers.rest,
			draft: variables.draft,
			idempotencyKey: variables.idempotencyKey,
		}),
		onMutate: async (variables) => {
			const snapshot = await optimistic.capture();
			const temporaryId = optimisticCategoryId();
			optimistic.applyCreate(
				categoryFromDraft(
					variables.draft,
					temporaryId,
					new Date().toISOString()
				)
			);

			return { snapshot, temporaryId };
		},
		onError: (_error, _variables, context) => {
			optimistic.restore(context?.snapshot);
		},
		onSuccess: (response, _variables, context) => {
			optimistic.applySettled(context.temporaryId, response.category);
		},
		onSettled: () => {
			for (const key of DERIVED_KEYS.onCategoryCreate) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});

	const { mutateAsync } = mutation;
	const create = useCallback((draft: CategoryDraft): Promise<CreateCategoryResponse> => (
		mutateAsync({ 
			draft,
			idempotencyKey: createIdempotencyKey()
		})
	), [mutateAsync]);

	return useMemo(() => ({
		...mutation,
		create
	}), [mutation, create]);
};

export { useCreateCategory };
export type { CreateCategoryContext, CreateCategoryVariables, UseCreateCategoryReturn };
