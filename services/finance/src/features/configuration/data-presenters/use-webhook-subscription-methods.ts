import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

import { useApiContext, DERIVED_KEYS } from "@app/api";
import { subscribeWebhook, unsubscribeWebhook } from "../webhooks-api";
import { CACHE_KEYS } from "./cache-config.ts";
import type { UseMutationResult } from "@tanstack/react-query";
import type { WebhookSubscription } from "@entity/configuration";

interface UseWebhookSubscriptionMethodsReturn {
	subscribe: UseMutationResult<WebhookSubscription, Error, string>;
	unsubscribe: UseMutationResult<WebhookSubscription, Error, string>;
}

const useWebhookSubscriptionMethods = (webhookId: string): UseWebhookSubscriptionMethodsReturn => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	const invalidate = (): void => {
		for (const key of DERIVED_KEYS.onSubscriptionChange) {
			void queryClient.invalidateQueries({ queryKey: [key] });
		}
	};

	const subscribe = useMutation<WebhookSubscription, Error, string>({
		mutationKey: [CACHE_KEYS.subscribe, webhookId],
		mutationFn: (event: string) => subscribeWebhook({
			handler: apiContext.webhookServers.rest,
			webhookId,
			event,
		}),
		onSettled: invalidate,
	});

	const unsubscribe = useMutation<WebhookSubscription, Error, string>({
		mutationKey: [CACHE_KEYS.unsubscribe, webhookId],
		mutationFn: (subscriptionId: string) => unsubscribeWebhook({
			handler: apiContext.webhookServers.rest,
			webhookId,
			subscriptionId,
		}),
		onSettled: invalidate,
	});

	return useMemo(() => ({ subscribe, unsubscribe }), [subscribe, unsubscribe]);
};

export { useWebhookSubscriptionMethods };
export type { UseWebhookSubscriptionMethodsReturn };
