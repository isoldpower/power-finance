import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { toggleAutomation } from "../automations-api";
import { AUTOMATIONS_CACHE_KEYS } from "./cache-config.ts";


interface ToggleAutomationVariables {
	id: string;
	enabled: boolean;
}

const useToggleAutomation = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [AUTOMATIONS_CACHE_KEYS.toggle],
		mutationFn: (variables: ToggleAutomationVariables) => toggleAutomation({
			handler: apiContext.automationServers.rest,
			id: variables.id,
			enabled: variables.enabled,
		}),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [AUTOMATIONS_CACHE_KEYS.list] });
		},
	});
};

export { useToggleAutomation };
export type { ToggleAutomationVariables };
