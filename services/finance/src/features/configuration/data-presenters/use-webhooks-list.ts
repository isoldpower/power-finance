import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { listWebhooks } from "../webhooks-api";
import { CACHE_KEYS } from "./cache-config.ts";
import type { PageParams } from "@shared/api";
import type { WebhookEndpoint } from "@entity/configuration";
import type { ListWebhooksResponse } from "../webhooks-api";

type UseWebhooksListOptions = Omit<UseQueryOptions<ListWebhooksResponse>, 'queryKey' | 'queryFn'>;

type UseWebhooksListReturn = UseQueryResult<ListWebhooksResponse> & {
	webhooks: WebhookEndpoint[];
	total: number;
	nextCursor: string | null;
	prevCursor: string | null;
};

const EMPTY_WEBHOOKS: WebhookEndpoint[] = [];

const useWebhooksList = (
	page?: PageParams,
	options?: UseWebhooksListOptions
): UseWebhooksListReturn => {
	const apiContext = useApiContext();
	const webhooksQuery = useQuery<ListWebhooksResponse>({
		queryKey: [CACHE_KEYS.list, page?.limit ?? 'default', page?.cursor ?? 'first'],
		queryFn: () => listWebhooks({
			handler: apiContext.webhookServers.rest,
			page,
		}),
		...options ?? {},
	});

	return useMemo(() => ({
		...webhooksQuery,
		webhooks: webhooksQuery.data?.page.items ?? EMPTY_WEBHOOKS,
		total: webhooksQuery.data?.page.total ?? 0,
		nextCursor: webhooksQuery.data?.page.nextCursor ?? null,
		prevCursor: webhooksQuery.data?.page.prevCursor ?? null,
	}), [webhooksQuery]);
};

export { useWebhooksList };
export type { UseWebhooksListOptions, UseWebhooksListReturn };
