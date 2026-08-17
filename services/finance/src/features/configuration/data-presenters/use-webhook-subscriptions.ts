import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { listSubscriptions } from "../webhooks-api";
import { CACHE_KEYS } from "./cache-config.ts";
import type { WebhookSubscription } from "@entity/configuration";
import type { ListSubscriptionsResponse } from "../webhooks-api";

type UseWebhookSubscriptionsOptions = Omit<
	UseQueryOptions<ListSubscriptionsResponse>,
	'queryKey' | 'queryFn'
>;

type UseWebhookSubscriptionsReturn = UseQueryResult<ListSubscriptionsResponse> & {
	subscriptions: WebhookSubscription[];
};

const EMPTY_SUBSCRIPTIONS: WebhookSubscription[] = [];

const useWebhookSubscriptions = (
	webhookId: string,
	options?: UseWebhookSubscriptionsOptions
): UseWebhookSubscriptionsReturn => {
	const apiContext = useApiContext();
	const subscriptionsQuery = useQuery<ListSubscriptionsResponse>({
		queryKey: [CACHE_KEYS.subscriptions, webhookId],
		queryFn: () => listSubscriptions({
			handler: apiContext.webhookServers.rest,
			webhookId,
		}),
		enabled: webhookId !== '',
		...options ?? {},
	});

	return useMemo(() => ({
		...subscriptionsQuery,
		subscriptions: subscriptionsQuery.data?.page.items ?? EMPTY_SUBSCRIPTIONS,
	}), [subscriptionsQuery]);
};

export { useWebhookSubscriptions };
export type { UseWebhookSubscriptionsOptions, UseWebhookSubscriptionsReturn };
