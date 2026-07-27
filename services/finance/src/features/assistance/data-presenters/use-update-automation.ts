import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { updateAutomation } from "../automations-api";
import { AUTOMATIONS_CACHE_KEYS } from "./cache-config.ts";
import type { AutomationUpdatePayload } from "../automations-api";


interface UpdateAutomationVariables {
	id: string;
	data: AutomationUpdatePayload;
}

const useUpdateAutomation = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [AUTOMATIONS_CACHE_KEYS.update],
		mutationFn: (variables: UpdateAutomationVariables) => updateAutomation({
			handler: apiContext.automationServers.rest,
			id: variables.id,
			data: variables.data,
		}),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [AUTOMATIONS_CACHE_KEYS.list] });
		},
	});
};

export { useUpdateAutomation };
export type { UpdateAutomationVariables };
