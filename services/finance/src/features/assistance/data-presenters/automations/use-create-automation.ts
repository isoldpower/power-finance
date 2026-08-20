import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { createAutomation } from "../../automations-api";
import { AUTOMATIONS_CACHE_KEYS } from "../cache-config.ts";

import type { AutomationDraft } from "@entity/assistance";


const useCreateAutomation = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [AUTOMATIONS_CACHE_KEYS.create],
		mutationFn: (draft: AutomationDraft) => createAutomation({
			handler: apiContext.automationServers.rest,
			draft,
		}),
		onSettled: () => {
			for (const key of DERIVED_KEYS.onAutomationChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useCreateAutomation };
