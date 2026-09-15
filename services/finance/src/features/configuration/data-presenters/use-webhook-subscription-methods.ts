import { useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { subscribeWebhook, unsubscribeWebhook } from "../webhooks-api";
import { CACHE_KEYS } from "./cache-config.ts";
import {
	optimisticWebhookId,
	subscriptionFromEvent,
	useOptimisticSubscriptions,
} from "./optimistic";

import type { UseMutationResult } from "@tanstack/react-query";
import type { WebhookSubscription } from "@entity/configuration";
import type { SubscriptionCachesSnapshot } from "./optimistic";


interface SubscribeContext {
	snapshot: SubscriptionCachesSnapshot;
	temporaryId: string;
}

interface UseWebhookSubscriptionMethodsReturn {
	subscribe: UseMutationResult<WebhookSubscription, Error, string, SubscribeContext>;
	unsubscribe: UseMutationResult<WebhookSubscription, Error, string, SubscriptionCachesSnapshot>;
}

const useWebhookSubscriptionMethods = (webhookId: string): UseWebhookSubscriptionMethodsReturn => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const optimistic = useOptimisticSubscriptions();

	const invalidate = useCallback((): void => {
		for (const key of DERIVED_KEYS.onSubscriptionChange) {
			void queryClient.invalidateQueries({ queryKey: [key] });
		}
	}, [queryClient]);

	const subscribe = useMutation<WebhookSubscription, Error, string, SubscribeContext>({
		mutationKey: [CACHE_KEYS.subscribe, webhookId],
		mutationFn: (event: string) => subscribeWebhook({
			handler: apiContext.webhookServers.rest,
			webhookId,
			event,
		}),
		onMutate: async (event: string) => {
			const snapshot = await optimistic.capture();
			const temporaryId = optimisticWebhookId();
			optimistic.applySubscribe(
				subscriptionFromEvent(event, temporaryId, webhookId, new Date().toISOString()),
			);

			return { snapshot, temporaryId };
		},
		onError: (_error, _event, context) => {
			optimistic.restore(context?.snapshot);
		},
		onSuccess: (subscription, _event, context) => {
			optimistic.applySettled(context.temporaryId, subscription);
		},
		onSettled: invalidate,
	});

	const unsubscribe = useMutation<WebhookSubscription, Error, string, SubscriptionCachesSnapshot>({
		mutationKey: [CACHE_KEYS.unsubscribe, webhookId],
		mutationFn: (subscriptionId: string) => unsubscribeWebhook({
			handler: apiContext.webhookServers.rest,
			webhookId,
			subscriptionId,
		}),
		onMutate: async (subscriptionId: string) => {
			const snapshot = await optimistic.capture();
			optimistic.applyUnsubscribe(subscriptionId);

			return snapshot;
		},
		onError: (_error, _subscriptionId, snapshot) => {
			optimistic.restore(snapshot);
		},
		onSettled: invalidate,
	});

	return useMemo(() => ({ subscribe, unsubscribe }), [subscribe, unsubscribe]);
};

export { useWebhookSubscriptionMethods };
export type { SubscribeContext, UseWebhookSubscriptionMethodsReturn };
