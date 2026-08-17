import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { listEventTypes } from "../webhooks-api";
import { CACHE_KEYS } from "./cache-config.ts";
import type { WebhookEventType } from "@entity/configuration";
import type { ListEventTypesResponse } from "../webhooks-api";

type UseWebhookEventTypesOptions = Omit<UseQueryOptions<ListEventTypesResponse>, 'queryKey' | 'queryFn'>;

type UseWebhookEventTypesReturn = UseQueryResult<ListEventTypesResponse> & {
	eventTypes: WebhookEventType[];
};

const EMPTY_EVENT_TYPES: WebhookEventType[] = [];
const DAY_IN_MS = 24 * 60 * 60 * 1000;

const useWebhookEventTypes = (
	options?: UseWebhookEventTypesOptions
): UseWebhookEventTypesReturn => {
	const apiContext = useApiContext();
	const eventTypesQuery = useQuery<ListEventTypesResponse>({
		queryKey: [CACHE_KEYS.eventTypes],
		queryFn: () => listEventTypes({ handler: apiContext.webhookServers.rest }),
		staleTime: DAY_IN_MS,
		...options ?? {},
	});

	return useMemo(() => ({
		...eventTypesQuery,
		eventTypes: eventTypesQuery.data?.eventTypes ?? EMPTY_EVENT_TYPES,
	}), [eventTypesQuery]);
};

export { useWebhookEventTypes };
export type { UseWebhookEventTypesOptions, UseWebhookEventTypesReturn };
