import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { listNotifications } from "../../notifications-api";
import { NOTIFICATIONS_CACHE_KEYS } from "../cache-config.ts";
import type { PageParams } from "@shared/api";
import type { Notification, NotificationQuery } from "@entity/assistance";
import type { ListNotificationsResponse } from "../../notifications-api";

type UseNotificationsOptions = Omit<UseQueryOptions<ListNotificationsResponse>, 'queryKey' | 'queryFn'>;

type UseNotificationsReturn = UseQueryResult<ListNotificationsResponse> & {
	notifications: Notification[];
	total: number;
	nextCursor: string | null;
	prevCursor: string | null;
};

const EMPTY_NOTIFICATIONS: Notification[] = [];

const useNotifications = (
	query?: NotificationQuery,
	page?: PageParams,
	options?: UseNotificationsOptions
): UseNotificationsReturn => {
	const apiContext = useApiContext();
	const notificationsQuery = useQuery<ListNotificationsResponse>({
		queryKey: [
			NOTIFICATIONS_CACHE_KEYS.list,
			query?.acknowledged ?? 'any',
			query?.severity ?? 'any',
			page?.limit ?? 'default',
			page?.cursor ?? 'first',
		],
		queryFn: () => listNotifications({
			handler: apiContext.notificationServers.rest,
			query,
			page,
		}),
		...options ?? {},
	});

	return useMemo(() => ({
		...notificationsQuery,
		notifications: notificationsQuery.data?.page.items ?? EMPTY_NOTIFICATIONS,
		total: notificationsQuery.data?.page.total ?? 0,
		nextCursor: notificationsQuery.data?.page.nextCursor ?? null,
		prevCursor: notificationsQuery.data?.page.prevCursor ?? null,
	}), [notificationsQuery]);
};

export { useNotifications };
export type { UseNotificationsOptions, UseNotificationsReturn };
