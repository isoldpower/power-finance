import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext, DERIVED_KEYS } from "@app/api";
import { deleteAutomation } from "../../automations-api";
import { AUTOMATIONS_CACHE_KEYS } from "../cache-config.ts";

const useDeleteAutomation = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [AUTOMATIONS_CACHE_KEYS.delete],
		mutationFn: (id: string) => deleteAutomation({
			handler: apiContext.automationServers.rest,
			id,
		}),
		onSettled: () => {
			for (const key of DERIVED_KEYS.onAutomationChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useDeleteAutomation };
