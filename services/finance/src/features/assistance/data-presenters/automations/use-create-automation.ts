import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { createAutomation } from "../../automations-api";
import { AUTOMATIONS_CACHE_KEYS } from "../cache-config.ts";
import { automationFromDraft, optimisticAutomationId, useOptimisticAutomations } from "./optimistic";

import type { UseMutationResult } from "@tanstack/react-query";
import type { AutomationDraft } from "@entity/assistance";
import type { CreateAutomationResponse } from "../../automations-api";
import type { AutomationCachesSnapshot } from "./optimistic";


interface CreateAutomationContext {
	snapshot: AutomationCachesSnapshot;
	temporaryId: string;
}

const useCreateAutomation = (): UseMutationResult<
	CreateAutomationResponse,
	Error,
	AutomationDraft,
	CreateAutomationContext
> => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const optimistic = useOptimisticAutomations();

	return useMutation<CreateAutomationResponse, Error, AutomationDraft, CreateAutomationContext>({
		mutationKey: [AUTOMATIONS_CACHE_KEYS.create],
		mutationFn: (draft: AutomationDraft) => createAutomation({
			handler: apiContext.automationServers.rest,
			draft,
		}),
		onMutate: async (draft: AutomationDraft) => {
			const snapshot = await optimistic.capture();
			const temporaryId = optimisticAutomationId();
			optimistic.applyCreate(automationFromDraft(draft, temporaryId, new Date().toISOString()));

			return { snapshot, temporaryId };
		},
		onError: (_error, _draft, context) => {
			optimistic.restore(context?.snapshot);
		},
		onSuccess: (response, _draft, context) => {
			optimistic.applySettled(context.temporaryId, response.automation);
		},
		onSettled: () => {
			for (const key of DERIVED_KEYS.onAutomationChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useCreateAutomation };
export type { CreateAutomationContext };
