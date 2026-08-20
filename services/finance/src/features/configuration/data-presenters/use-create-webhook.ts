import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { createWebhookEndpoint } from "../webhooks-api";
import { CACHE_KEYS } from "./cache-config.ts";

import type { WebhookDraft } from "@entity/configuration";


const useCreateWebhook = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [CACHE_KEYS.create],
		mutationFn: (draft: WebhookDraft) => createWebhookEndpoint({
			handler: apiContext.webhookServers.rest,
			draft,
		}),
		onSettled: () => {
			for (const key of DERIVED_KEYS.onWebhookChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useCreateWebhook };
