import type { UseQueryOptions } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { useResourceQuery } from "@shared/data";
import type { UseResourceQueryResult } from "@shared/data";
import { listNotifications } from "../../assistance-api/notifications";
import { NOTIFICATIONS_CACHE_KEYS } from "../cache-config.ts";
import type { Notification, ListNotificationsResponse } from "../../assistance-api/notifications";


interface UseNotificationsParams {
	ack?: boolean;
	limit?: number;
}

type UseNotificationsOptions = Omit<UseQueryOptions<ListNotificationsResponse>, 'queryKey' | 'queryFn'>;

type UseNotificationsReturn = UseResourceQueryResult<ListNotificationsResponse, Notification[]> & {
	notifications: Notification[];
};

const EMPTY_NOTIFICATIONS: Notification[] = [];

const useNotifications = (
	params?: UseNotificationsParams,
	options?: UseNotificationsOptions
): UseNotificationsReturn => {
	const apiContext = useApiContext();
	const query = useResourceQuery<ListNotificationsResponse, Notification[]>({
		key: [NOTIFICATIONS_CACHE_KEYS.list, params?.ack ?? 'any', params?.limit ?? 'all'],
		fetch: () => listNotifications({
			handler: apiContext.notificationServers.rest,
			ack: params?.ack,
			limit: params?.limit,
		}),
		select: (response) => response.data,
		fallback: EMPTY_NOTIFICATIONS,
		options,
	});

	return { ...query, notifications: query.value };
};

export { useNotifications };
export type { UseNotificationsParams, UseNotificationsOptions, UseNotificationsReturn };
