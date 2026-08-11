// @reserved-api - wired to the API and intentionally not consumed yet; awaiting post-MVP flows. NOT dead code: do not delete, do not drop from barrels.
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { updateAutomation } from "../../assistance-api/automations";
import { AUTOMATIONS_CACHE_KEYS } from "../cache-config.ts";
import type { AutomationUpdatePayload } from "../../assistance-api/automations";


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
