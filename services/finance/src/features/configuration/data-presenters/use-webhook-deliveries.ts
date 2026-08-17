import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { listDeliveries } from "../webhooks-api";
import { CACHE_KEYS } from "./cache-config.ts";
import type { PageParams } from "@shared/api";
import type { DeliveryQuery, WebhookDelivery } from "@entity/configuration";
import type { ListDeliveriesResponse } from "../webhooks-api";

type UseWebhookDeliveriesOptions = Omit<UseQueryOptions<ListDeliveriesResponse>, 'queryKey' | 'queryFn'>;

type UseWebhookDeliveriesReturn = UseQueryResult<ListDeliveriesResponse> & {
	deliveries: WebhookDelivery[];
	total: number;
	nextCursor: string | null;
};

const EMPTY_DELIVERIES: WebhookDelivery[] = [];

const useWebhookDeliveries = (
	webhookId: string,
	query?: DeliveryQuery,
	page?: PageParams,
	options?: UseWebhookDeliveriesOptions
): UseWebhookDeliveriesReturn => {
	const apiContext = useApiContext();
	const deliveriesQuery = useQuery<ListDeliveriesResponse>({
		queryKey: [
			CACHE_KEYS.deliveries,
			webhookId,
			query?.status ?? 'any',
			query?.event ?? 'any',
			page?.cursor ?? 'first',
		],
		queryFn: () => listDeliveries({
			handler: apiContext.webhookServers.rest,
			webhookId,
			query,
			page,
		}),
		enabled: webhookId !== '',
		...options ?? {},
	});

	return useMemo(() => ({
		...deliveriesQuery,
		deliveries: deliveriesQuery.data?.page.items ?? EMPTY_DELIVERIES,
		total: deliveriesQuery.data?.page.total ?? 0,
		nextCursor: deliveriesQuery.data?.page.nextCursor ?? null,
	}), [deliveriesQuery]);
};

export { useWebhookDeliveries };
export type { UseWebhookDeliveriesOptions, UseWebhookDeliveriesReturn };
