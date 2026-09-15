import { useCallback, useMemo } from "react";
import { useOptimisticCache } from "@shared/data";

import { SUBSCRIPTION_RESOURCE } from "./resource.ts";

import type { WebhookSubscription } from "@entity/configuration";
import type { SubscriptionCachesSnapshot } from "./types.ts";


interface UseOptimisticSubscriptionsReturn {
	capture: () => Promise<SubscriptionCachesSnapshot>;
	restore: (snapshot: SubscriptionCachesSnapshot | undefined) => void;
	applySubscribe: (subscription: WebhookSubscription) => void;
	applyUnsubscribe: (id: string) => void;
	applySettled: (id: string, subscription: WebhookSubscription) => void;
}

const useOptimisticSubscriptions = (): UseOptimisticSubscriptionsReturn => {
	const cache = useOptimisticCache(SUBSCRIPTION_RESOURCE);

	const applySubscribe = useCallback((subscription: WebhookSubscription): void => {
		cache.insertPaged([subscription]);
	}, [cache]);

	const applyUnsubscribe = useCallback((id: string): void => {
		cache.removePaged([id]);
	}, [cache]);

	const applySettled = useCallback((id: string, subscription: WebhookSubscription): void => {
		cache.settlePaged(id, subscription);
	}, [cache]);

	return useMemo(() => ({
		capture: cache.capture,
		restore: cache.restore,
		applySubscribe,
		applyUnsubscribe,
		applySettled,
	}), [cache.capture, cache.restore, applySubscribe, applyUnsubscribe, applySettled]);
};

export { useOptimisticSubscriptions };
export type { UseOptimisticSubscriptionsReturn };
