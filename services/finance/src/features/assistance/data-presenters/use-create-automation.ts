import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { createAutomation } from "../automations-api";
import { AUTOMATIONS_CACHE_KEYS } from "./cache-config.ts";
import type { AutomationCreatePayload } from "../automations-api";


const useCreateAutomation = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [AUTOMATIONS_CACHE_KEYS.create],
		mutationFn: (data: AutomationCreatePayload) => createAutomation({
			handler: apiContext.automationServers.rest,
			data,
		}),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [AUTOMATIONS_CACHE_KEYS.list] });
		},
	});
};

export { useCreateAutomation };
