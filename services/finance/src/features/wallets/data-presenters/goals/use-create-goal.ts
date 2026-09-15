import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { createGoal } from "../../goals-api";
import { GOALS_CACHE_KEYS } from "../cache-config.ts";
import { goalFromDraft, optimisticGoalId, useOptimisticGoals } from "./optimistic";

import type { UseMutationResult } from "@tanstack/react-query";
import type { GoalDraft } from "@entity/wallets";
import type { CreateGoalResponse } from "../../goals-api";
import type { GoalCachesSnapshot } from "./optimistic";


interface CreateGoalContext {
	snapshot: GoalCachesSnapshot;
	temporaryId: string;
}

const useCreateGoal = (): UseMutationResult<
	CreateGoalResponse,
	Error,
	GoalDraft,
	CreateGoalContext
> => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const optimistic = useOptimisticGoals();

	return useMutation<CreateGoalResponse, Error, GoalDraft, CreateGoalContext>({
		mutationKey: [GOALS_CACHE_KEYS.create],
		mutationFn: (draft: GoalDraft) => createGoal({
			handler: apiContext.goalServers.rest,
			draft,
		}),
		onMutate: async (draft: GoalDraft) => {
			const snapshot = await optimistic.capture();
			const temporaryId = optimisticGoalId();
			optimistic.applyCreate(goalFromDraft(draft, temporaryId, new Date().toISOString()));

			return { snapshot, temporaryId };
		},
		onError: (_error, _draft, context) => {
			optimistic.restore(context?.snapshot);
		},
		onSuccess: (response, _draft, context) => {
			optimistic.applySettled(context.temporaryId, response.goal);
		},
		onSettled: () => {
			for (const key of DERIVED_KEYS.onGoalChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useCreateGoal };
export type { CreateGoalContext };
