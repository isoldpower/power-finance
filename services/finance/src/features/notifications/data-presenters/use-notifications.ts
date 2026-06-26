import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { listNotifications } from "@feature/notifications";
import { CACHE_KEYS } from "./cache-config.ts";
import type { Notification, ListNotificationsResponse } from "@feature/notifications";

interface UseNotificationsParams {
	ack?: boolean;
	limit?: number;
}

type UseNotificationsOptions = Omit<UseQueryOptions<ListNotificationsResponse>, 'queryKey' | 'queryFn'>;

type UseNotificationsReturn = UseQueryResult<ListNotificationsResponse> & {
	notifications: Notification[];
};

const useNotifications = (
	params?: UseNotificationsParams,
	options?: UseNotificationsOptions
): UseNotificationsReturn => {
	const apiContext = useApiContext();
	const query = useQuery<ListNotificationsResponse>({
		queryKey: [CACHE_KEYS.list, params?.ack ?? 'any', params?.limit ?? 'all'],
		queryFn: () => listNotifications({
			handler: apiContext.notificationServers.rest,
			ack: params?.ack,
			limit: params?.limit,
		}),
		...options ?? {},
	});

	return useMemo(() => ({
		...query,
		notifications: query.data?.data ?? [],
	}), [query]);
};

export { useNotifications };
export type { UseNotificationsParams, UseNotificationsOptions, UseNotificationsReturn };
