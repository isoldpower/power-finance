import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { updateAutomation } from "../../automations-api";
import { AUTOMATIONS_CACHE_KEYS } from "../cache-config.ts";
import { useOptimisticAutomations } from "./optimistic";

import type { UseMutationResult } from "@tanstack/react-query";
import type { AutomationPatch } from "@entity/assistance";
import type { UpdateAutomationResponse } from "../../automations-api";
import type { AutomationCachesSnapshot } from "./optimistic";


interface UpdateAutomationInput {
	id: string;
	patch: AutomationPatch;
}

const useUpdateAutomation = (): UseMutationResult<
	UpdateAutomationResponse,
	Error,
	UpdateAutomationInput,
	AutomationCachesSnapshot
> => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const optimistic = useOptimisticAutomations();

	return useMutation<
		UpdateAutomationResponse,
		Error,
		UpdateAutomationInput,
		AutomationCachesSnapshot
	>({
		mutationKey: [AUTOMATIONS_CACHE_KEYS.update],
		mutationFn: (input: UpdateAutomationInput) => updateAutomation({
			handler: apiContext.automationServers.rest,
			id: input.id,
			patch: input.patch,
		}),
		onMutate: async (input: UpdateAutomationInput) => {
			const snapshot = await optimistic.capture();
			optimistic.applyPatch(input.id, input.patch);

			return snapshot;
		},
		onError: (_error, _input, snapshot) => {
			optimistic.restore(snapshot);
		},
		onSuccess: (automation, input) => {
			optimistic.applySettled(input.id, automation);
		},
		onSettled: () => {
			for (const key of DERIVED_KEYS.onAutomationChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useUpdateAutomation };
export type { UpdateAutomationInput };
