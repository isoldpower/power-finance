import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import {
	createWebhookEndpoint as createWebhookEndpointApi,
	listWebhooks as listWebhooksApi
} from "@feature/webhook";
import { CACHE_KEYS } from "./cache-config.ts";
import type {
	CreateWebhookRequest,
	CreateWebhookResponse,
	WebhookValuableFields,
	ListWebhooksResponse
} from "@feature/webhook";


interface UseWebhooksReturn {
	meta: {
		query: UseQueryResult<ListWebhooksResponse>;
		createMutation: UseMutationResult<CreateWebhookResponse, Error, CreateWebhookRequest['payload']>;
	}
	createWebhook: (data: WebhookValuableFields) => void;
	fetchAllWebhooks: () => void;
}

const useWebhooksListMethods = (): UseWebhooksReturn => {
	const apiContext = useApiContext();

	const query = useQuery({
		queryKey: [CACHE_KEYS.list],
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		queryFn: () => listWebhooksApi({
			handler: apiContext.webhookServers.rest
		})
	});

	const createMutation = useMutation({
		mutationFn: (data: CreateWebhookRequest['payload']) => createWebhookEndpointApi({
			payload: data,
			handler: apiContext.webhookServers.rest
		}),
		mutationKey: [CACHE_KEYS.create],
		onSettled: () => query.refetch()
	});

	const createWebhook = useCallback((
		data: WebhookValuableFields
	) => {
		createMutation.mutate({ data });
	}, [createMutation]);

	const fetchAllWebhooks = useCallback(() => {
		return query.refetch();
	}, [query]);

	const meta = useMemo(() => ({
		createMutation,
		query
	}), [createMutation, query]);

	return useMemo(() => ({
		createWebhook,
		fetchAllWebhooks,
		meta
	}), [meta, createWebhook, fetchAllWebhooks]);
}

export { useWebhooksListMethods };
export type { UseWebhooksReturn };