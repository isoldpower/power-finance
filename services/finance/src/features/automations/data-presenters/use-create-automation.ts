import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { createAutomation } from "@feature/automations";
import { CACHE_KEYS } from "./cache-config.ts";
import type { AutomationCreatePayload } from "@feature/automations";

const useCreateAutomation = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [CACHE_KEYS.create],
		mutationFn: (data: AutomationCreatePayload) => createAutomation({
			handler: apiContext.automationServers.rest,
			data,
		}),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.list] });
		},
	});
};

export { useCreateAutomation };
