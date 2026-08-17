import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext, DERIVED_KEYS } from "@app/api";
import { createGoal } from "../../goals-api";
import { GOALS_CACHE_KEYS } from "../cache-config.ts";
import type { GoalDraft } from "@entity/wallets";

const useCreateGoal = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [GOALS_CACHE_KEYS.create],
		mutationFn: (draft: GoalDraft) => createGoal({
			handler: apiContext.goalServers.rest,
			draft,
		}),
		onSettled: () => {
			for (const key of DERIVED_KEYS.onGoalChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useCreateGoal };
