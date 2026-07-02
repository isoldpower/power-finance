import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { listWebhooks } from "@feature/configuration";
import { useApiContext } from "@app/api";
import { CACHE_KEYS } from "./cache-config.ts";
import { useMemo } from "react";
import type { WebhookEndpoint } from "@entity/configuration";
import type { ListWebhooksResponse } from "@feature/configuration";


type UseWebhooksListOptions = Omit<UseQueryOptions<ListWebhooksResponse>, 'queryKey' | 'queryFn'> & {};

type UseWebhooksListReturn = UseQueryResult & {
	webhooks: WebhookEndpoint[];
}

const useWebhooksList = (
	options?: UseWebhooksListOptions
): UseWebhooksListReturn  => {
	const apiContext = useApiContext();
	const query = useQuery<ListWebhooksResponse>({
		queryKey: [CACHE_KEYS.list],
		queryFn: () => listWebhooks({
			handler: apiContext.webhookServers.rest
		}),
		...options ?? {}
	});

	return useMemo(() => ({
		...query,
		webhooks: query.data?.data ?? []
	}), [query]);
}

export { useWebhooksList };
export type { UseWebhooksListReturn, UseWebhooksListOptions };