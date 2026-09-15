import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { deleteGoal } from "../../goals-api";
import { GOALS_CACHE_KEYS } from "../cache-config.ts";
import { useOptimisticGoals } from "./optimistic";

import type { UseMutationResult } from "@tanstack/react-query";
import type { DeleteGoalResponse } from "../../goals-api";
import type { GoalCachesSnapshot } from "./optimistic";


const useDeleteGoal = (): UseMutationResult<
	DeleteGoalResponse,
	Error,
	string,
	GoalCachesSnapshot
> => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const optimistic = useOptimisticGoals();

	return useMutation<DeleteGoalResponse, Error, string, GoalCachesSnapshot>({
		mutationKey: [GOALS_CACHE_KEYS.delete],
		mutationFn: (id: string) => deleteGoal({
			handler: apiContext.goalServers.rest,
			id,
		}),
		onMutate: async (id: string) => {
			const snapshot = await optimistic.capture();
			optimistic.applyRemove(id, new Date().toISOString());

			return snapshot;
		},
		onError: (_error, _id, snapshot) => {
			optimistic.restore(snapshot);
		},
		onSettled: () => {
			for (const key of DERIVED_KEYS.onGoalChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useDeleteGoal };
