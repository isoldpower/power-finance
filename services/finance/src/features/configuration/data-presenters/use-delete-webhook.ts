import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { deleteWebhookEndpoint } from "../webhooks-api";
import { CACHE_KEYS } from "./cache-config.ts";
import { useOptimisticWebhooks } from "./optimistic";

import type { WebhookCachesSnapshot } from "./optimistic";


const useDeleteWebhook = (id: string) => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const optimistic = useOptimisticWebhooks();

	return useMutation({
		mutationKey: [CACHE_KEYS.delete, id],
		mutationFn: () => deleteWebhookEndpoint({
			handler: apiContext.webhookServers.rest,
			id,
		}),
		onMutate: async (): Promise<WebhookCachesSnapshot> => {
			const snapshot = await optimistic.capture();
			optimistic.applyRemove(id);

			return snapshot;
		},
		onError: (_error, _variables, snapshot) => {
			optimistic.restore(snapshot);
		},
		onSettled: () => {
			for (const key of DERIVED_KEYS.onWebhookChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useDeleteWebhook };
