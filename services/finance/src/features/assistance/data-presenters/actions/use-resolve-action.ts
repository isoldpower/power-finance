import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { resolveAction } from "../../actions-api";
import { ACTIONS_CACHE_KEYS } from "../cache-config.ts";
import { useOptimisticActions } from "./optimistic";

import type { UseMutationResult } from "@tanstack/react-query";
import type { ResolveActionResponse } from "../../actions-api";
import type { ActionCachesSnapshot } from "./optimistic";


interface ResolveActionInput {
	id: string;
	resolutionId: string;
}

const useResolveAction = (): UseMutationResult<
	ResolveActionResponse,
	Error,
	ResolveActionInput,
	ActionCachesSnapshot
> => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const optimistic = useOptimisticActions();

	return useMutation<ResolveActionResponse, Error, ResolveActionInput, ActionCachesSnapshot>({
		mutationKey: [ACTIONS_CACHE_KEYS.resolve],
		mutationFn: (input: ResolveActionInput) => resolveAction({
			handler: apiContext.actionServers.rest,
			id: input.id,
			resolutionId: input.resolutionId,
		}),
		onMutate: async (input: ResolveActionInput) => {
			const snapshot = await optimistic.capture();
			optimistic.applyResolve(input.id, new Date().toISOString());

			return snapshot;
		},
		onError: (_error, _input, snapshot) => {
			optimistic.restore(snapshot);
		},
		onSuccess: (action, input) => {
			optimistic.applySettled(input.id, action);
		},
		onSettled: () => {
			for (const key of DERIVED_KEYS.onActionChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useResolveAction };
export type { ResolveActionInput };
