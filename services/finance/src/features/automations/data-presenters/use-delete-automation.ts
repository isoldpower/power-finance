import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { deleteAutomation } from "@feature/automations";
import { CACHE_KEYS } from "./cache-config.ts";

const useDeleteAutomation = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [CACHE_KEYS.delete],
		mutationFn: (id: string) => deleteAutomation({
			handler: apiContext.automationServers.rest,
			id,
		}),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.list] });
		},
	});
};

export { useDeleteAutomation };
