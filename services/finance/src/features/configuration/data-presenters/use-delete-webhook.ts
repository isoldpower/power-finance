import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext, DERIVED_KEYS } from "@app/api";
import { deleteWebhookEndpoint } from "../webhooks-api";
import { CACHE_KEYS } from "./cache-config.ts";

const useDeleteWebhook = (id: string) => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [CACHE_KEYS.delete, id],
		mutationFn: () => deleteWebhookEndpoint({
			handler: apiContext.webhookServers.rest,
			id,
		}),
		onSettled: () => {
			for (const key of DERIVED_KEYS.onWebhookChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useDeleteWebhook };
