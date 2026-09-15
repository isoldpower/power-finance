import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { deleteAutomation } from "../../automations-api";
import { AUTOMATIONS_CACHE_KEYS } from "../cache-config.ts";
import { useOptimisticAutomations } from "./optimistic";

import type { UseMutationResult } from "@tanstack/react-query";
import type { DeleteAutomationResponse } from "../../automations-api";
import type { AutomationCachesSnapshot } from "./optimistic";


const useDeleteAutomation = (): UseMutationResult<
	DeleteAutomationResponse,
	Error,
	string,
	AutomationCachesSnapshot
> => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const optimistic = useOptimisticAutomations();

	return useMutation<DeleteAutomationResponse, Error, string, AutomationCachesSnapshot>({
		mutationKey: [AUTOMATIONS_CACHE_KEYS.delete],
		mutationFn: (id: string) => deleteAutomation({
			handler: apiContext.automationServers.rest,
			id,
		}),
		onMutate: async (id: string) => {
			const snapshot = await optimistic.capture();
			optimistic.applyRemove(id);

			return snapshot;
		},
		onError: (_error, _id, snapshot) => {
			optimistic.restore(snapshot);
		},
		onSettled: () => {
			for (const key of DERIVED_KEYS.onAutomationChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useDeleteAutomation };
