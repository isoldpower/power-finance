import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { updateWebhookEndpoint } from "../webhooks-api";
import { CACHE_KEYS } from "./cache-config.ts";

import type { WebhookPatch } from "@entity/configuration";


const useUpdateWebhook = (id: string) => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [CACHE_KEYS.update, id],
		mutationFn: (patch: WebhookPatch) => updateWebhookEndpoint({
			handler: apiContext.webhookServers.rest,
			id,
			patch,
		}),
		onSettled: () => {
			for (const key of DERIVED_KEYS.onWebhookChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useUpdateWebhook };
