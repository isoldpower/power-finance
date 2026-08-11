import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback , useMemo } from "react";
import type { UseMutationResult } from "@tanstack/react-query";

import { deleteWebhookEndpoint as deleteWebhookApi } from "../webhooks-api/methods/delete-webhook.ts";
import { fetchWebhookEndpoint as fetchWebhookApi } from "../webhooks-api/methods/fetch-webhook.ts";
import { updateWebhookEndpoint as updateWebhookApi, UpdateWebhookRequest, UpdateWebhookResponse } from "../webhooks-api/methods/update-webhook.ts";
import { WebhookValuableFields } from "../webhooks-api/types.ts";
import { useApiContext } from "@app/api";
import { CACHE_KEYS } from "./cache-config.ts";
import type { DeleteWebhookResponse } from "../webhooks-api";
import type { FetchWebhookResponse, ListWebhooksResponse } from "../webhooks-api";
import type { WebhookDeleteRequest } from "../webhooks-api/rest-client/types.ts";


interface UseWebhookReturn {
	meta: {
		deleteMutation: UseMutationResult<DeleteWebhookResponse, Error, string>;
		updateMutation: UseMutationResult<UpdateWebhookResponse, Error, UpdateWebhookRequest['payload']>;
	}
	deleteWebhook: () => Promise<DeleteWebhookResponse>;
	updateWebhook: (data: Partial<WebhookValuableFields>) => Promise<UpdateWebhookResponse>;
}

const useWebhookMethods = (
	id: string
): UseWebhookReturn => {
	const apiContext = useApiContext();
	const client = useQueryClient();
	const singleQuery = useQuery({
		queryKey: [CACHE_KEYS.fetch, id],
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		queryFn: () => fetchWebhookApi({
			payload: { id },
			handler: apiContext.webhookServers.rest
		})
	});

	const synchronizeList = useCallback((
		data: FetchWebhookResponse | undefined
	) => {
		if (!data) return;

		client.setQueryData([CACHE_KEYS.list], (oldData: ListWebhooksResponse | undefined) => {
			if (!oldData) return [];

			return {
				data: oldData.data.map((transaction) => transaction.id === data.id ? data : transaction),
				meta: oldData.meta
			};
		})
	}, [client]);

	const filterList = useCallback((
		data: FetchWebhookResponse | undefined
	) => {
		if (!data) return;

		client.setQueryData([CACHE_KEYS.list], (oldData: ListWebhooksResponse | undefined) => {
			if (!oldData) return [];

			return {
				data: oldData.data.filter((webhook) => webhook.id !== data.id),
				meta: {
					...oldData.meta,
					total: oldData.meta.total - 1
				}
			};
		})
	}, [client]);

	const deleteMutation = useMutation({
		mutationFn: (id: WebhookDeleteRequest['id']) => deleteWebhookApi({
			id,
			handler: apiContext.webhookServers.rest
		}),
		mutationKey: [CACHE_KEYS.delete, id],
		onSettled: () => { filterList(singleQuery.data); }
	});

	const updateMutation = useMutation({
		mutationFn: (data: UpdateWebhookRequest['payload']) => updateWebhookApi({
			payload: data,
			handler: apiContext.webhookServers.rest
		}),
		mutationKey: [CACHE_KEYS.update, id],
		onSettled: () => singleQuery.refetch()
			.then(({ data }) => { synchronizeList(data); })
	});

	const fetchWebhook = useCallback(() => {
		return singleQuery.refetch();
	}, [singleQuery]);

	const deleteWebhook = useCallback(() => {
		return deleteMutation.mutateAsync(id);
	}, [deleteMutation, id]);
	
	const updateWebhook = useCallback((data: Partial<WebhookValuableFields>) => {
		return updateMutation.mutateAsync({ id, data })
	}, [updateMutation, id]);

	const meta = useMemo(() => ({
		deleteMutation,
		updateMutation,
		query: singleQuery,
	}), [deleteMutation, updateMutation, singleQuery]);

	return useMemo(() => ({
		meta,
		deleteWebhook,
		fetchWebhook,
		updateWebhook
	}), [meta, fetchWebhook, deleteWebhook, updateWebhook]);
}

export { useWebhookMethods };
export type { UseWebhookReturn };