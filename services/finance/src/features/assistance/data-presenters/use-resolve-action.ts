import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { resolveAction } from "../actions-api";
import { ACTIONS_CACHE_KEYS } from "./cache-config.ts";

const useResolveAction = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [ACTIONS_CACHE_KEYS.resolve],
		mutationFn: (id: string) => resolveAction({
			handler: apiContext.actionServers.rest,
			id,
		}),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [ACTIONS_CACHE_KEYS.list] });
		},
	});
};

export { useResolveAction };
