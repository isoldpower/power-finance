import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { resolveAction } from "@feature/actions";
import { CACHE_KEYS } from "./cache-config.ts";

const useResolveAction = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [CACHE_KEYS.resolve],
		mutationFn: (id: string) => resolveAction({
			handler: apiContext.actionServers.rest,
			id,
		}),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.list] });
		},
	});
};

export { useResolveAction };
