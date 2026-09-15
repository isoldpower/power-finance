import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { updateWebhookEndpoint } from "../webhooks-api";
import { CACHE_KEYS } from "./cache-config.ts";
import { useOptimisticWebhooks } from "./optimistic";

import type { UseMutationResult } from "@tanstack/react-query";
import type { WebhookPatch } from "@entity/configuration";
import type { UpdateWebhookResponse } from "../webhooks-api";
import type { WebhookCachesSnapshot } from "./optimistic";


const useUpdateWebhook = (id: string): UseMutationResult<
	UpdateWebhookResponse,
	Error,
	WebhookPatch,
	WebhookCachesSnapshot
> => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const optimistic = useOptimisticWebhooks();

	return useMutation<UpdateWebhookResponse, Error, WebhookPatch, WebhookCachesSnapshot>({
		mutationKey: [CACHE_KEYS.update, id],
		mutationFn: (patch: WebhookPatch) => updateWebhookEndpoint({
			handler: apiContext.webhookServers.rest,
			id,
			patch,
		}),
		onMutate: async (patch: WebhookPatch) => {
			const snapshot = await optimistic.capture();
			optimistic.applyPatch(id, patch);

			return snapshot;
		},
		onError: (_error, _patch, snapshot) => {
			optimistic.restore(snapshot);
		},
		onSuccess: (webhook) => {
			optimistic.applySettled(id, webhook);
		},
		onSettled: () => {
			for (const key of DERIVED_KEYS.onWebhookChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useUpdateWebhook };
