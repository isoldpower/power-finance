import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext, DERIVED_KEYS } from "@app/api";
import { updateGoal } from "../../goals-api";
import { GOALS_CACHE_KEYS } from "../cache-config.ts";
import type { GoalPatch } from "@entity/wallets";

const useUpdateGoal = (id: string) => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [GOALS_CACHE_KEYS.update, id],
		mutationFn: (patch: GoalPatch) => updateGoal({
			handler: apiContext.goalServers.rest,
			id,
			patch,
		}),
		onSettled: () => {
			void queryClient.invalidateQueries({ queryKey: [GOALS_CACHE_KEYS.fetch, id] });
			for (const key of DERIVED_KEYS.onGoalChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useUpdateGoal };
