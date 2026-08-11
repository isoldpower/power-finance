import { useApiContext } from "@app/api";
import { useResourceMutation } from "@shared/data";
import { toggleAutomation } from "../../assistance-api/automations";
import { AUTOMATIONS_CACHE_KEYS } from "../cache-config.ts";
import type { AutomationToggleResponse, ListAutomationsResponse } from "../../assistance-api/automations";


interface ToggleAutomationVariables {
	id: string;
	enabled: boolean;
}

const useToggleAutomation = () => {
	const apiContext = useApiContext();

	return useResourceMutation<ToggleAutomationVariables, AutomationToggleResponse, ListAutomationsResponse>({
		key: [AUTOMATIONS_CACHE_KEYS.toggle],
		mutate: (variables) => toggleAutomation({
			handler: apiContext.automationServers.rest,
			id: variables.id,
			enabled: variables.enabled,
		}),
		optimistic: {
			key: [AUTOMATIONS_CACHE_KEYS.list],
			apply: (previous, variables) => previous
				? {
					...previous,
					data: previous.data.map((rule) => rule.id === variables.id
						? { ...rule, enabled: variables.enabled }
						: rule),
				}
				: previous,
		},
	});
};

export { useToggleAutomation };
export type { ToggleAutomationVariables };
