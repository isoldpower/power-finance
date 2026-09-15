import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { updateGoal } from "../../goals-api";
import { GOALS_CACHE_KEYS } from "../cache-config.ts";
import { useOptimisticGoals } from "./optimistic";

import type { UseMutationResult } from "@tanstack/react-query";
import type { GoalPatch } from "@entity/wallets";
import type { UpdateGoalResponse } from "../../goals-api";
import type { GoalCachesSnapshot } from "./optimistic";


const useUpdateGoal = (id: string): UseMutationResult<
	UpdateGoalResponse,
	Error,
	GoalPatch,
	GoalCachesSnapshot
> => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const optimistic = useOptimisticGoals();

	return useMutation<UpdateGoalResponse, Error, GoalPatch, GoalCachesSnapshot>({
		mutationKey: [GOALS_CACHE_KEYS.update, id],
		mutationFn: (patch: GoalPatch) => updateGoal({
			handler: apiContext.goalServers.rest,
			id,
			patch,
		}),
		onMutate: async (patch: GoalPatch) => {
			const snapshot = await optimistic.capture();
			optimistic.applyPatch(id, patch);

			return snapshot;
		},
		onError: (_error, _patch, snapshot) => {
			optimistic.restore(snapshot);
		},
		onSuccess: (goal) => {
			optimistic.applySettled(id, goal);
		},
		onSettled: () => {
			void queryClient.invalidateQueries({
				queryKey: [GOALS_CACHE_KEYS.fetch, id]
			});
			for (const key of DERIVED_KEYS.onGoalChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useUpdateGoal };
