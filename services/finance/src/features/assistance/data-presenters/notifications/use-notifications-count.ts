import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { countNotifications } from "../../notifications-api";
import { NOTIFICATIONS_CACHE_KEYS } from "../cache-config.ts";
import type { NotificationCounts } from "@entity/assistance";

type UseNotificationsCountOptions = Omit<UseQueryOptions<NotificationCounts>, 'queryKey' | 'queryFn'>;

type UseNotificationsCountReturn = UseQueryResult<NotificationCounts> & {
	unacknowledged: number;
	total: number;
};

const useNotificationsCount = (
	options?: UseNotificationsCountOptions
): UseNotificationsCountReturn => {
	const apiContext = useApiContext();
	const countQuery = useQuery<NotificationCounts>({
		queryKey: [NOTIFICATIONS_CACHE_KEYS.count],
		queryFn: () => countNotifications({ handler: apiContext.notificationServers.rest }),
		...options ?? {},
	});

	return useMemo(() => ({
		...countQuery,
		unacknowledged: countQuery.data?.unacknowledged ?? 0,
		total: countQuery.data?.total ?? 0,
	}), [countQuery]);
};

export { useNotificationsCount };
export type { UseNotificationsCountOptions, UseNotificationsCountReturn };
