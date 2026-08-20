import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { updateAutomation } from "../../automations-api";
import { AUTOMATIONS_CACHE_KEYS } from "../cache-config.ts";

import type { AutomationPatch } from "@entity/assistance";


interface UpdateAutomationInput {
	id: string;
	patch: AutomationPatch;
}

const useUpdateAutomation = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [AUTOMATIONS_CACHE_KEYS.update],
		mutationFn: (input: UpdateAutomationInput) => updateAutomation({
			handler: apiContext.automationServers.rest,
			id: input.id,
			patch: input.patch,
		}),
		onSettled: () => {
			for (const key of DERIVED_KEYS.onAutomationChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useUpdateAutomation };
export type { UpdateAutomationInput };
