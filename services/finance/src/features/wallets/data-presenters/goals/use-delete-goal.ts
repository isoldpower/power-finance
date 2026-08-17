import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext, DERIVED_KEYS } from "@app/api";
import { deleteGoal } from "../../goals-api";
import { GOALS_CACHE_KEYS } from "../cache-config.ts";

const useDeleteGoal = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [GOALS_CACHE_KEYS.delete],
		mutationFn: (id: string) => deleteGoal({
			handler: apiContext.goalServers.rest,
			id,
		}),
		onSettled: () => {
			for (const key of DERIVED_KEYS.onGoalChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useDeleteGoal };
