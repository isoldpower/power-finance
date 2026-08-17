import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext, DERIVED_KEYS } from "@app/api";
import { resolveAction } from "../../actions-api";
import { ACTIONS_CACHE_KEYS } from "../cache-config.ts";

interface ResolveActionInput {
	id: string;
	resolutionId: string;
}

const useResolveAction = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [ACTIONS_CACHE_KEYS.resolve],
		mutationFn: (input: ResolveActionInput) => resolveAction({
			handler: apiContext.actionServers.rest,
			id: input.id,
			resolutionId: input.resolutionId,
		}),
		onSettled: () => {
			for (const key of DERIVED_KEYS.onActionChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useResolveAction };
export type { ResolveActionInput };
