import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { countNotifications } from "../notifications-api";
import { NOTIFICATIONS_CACHE_KEYS } from "./cache-config.ts";
import type { NotificationCountResponse } from "../notifications-api";


type UseNotificationsCountReturn = UseQueryResult<NotificationCountResponse> & {
	count: number;
};

const useNotificationsCount = (ack = false): UseNotificationsCountReturn => {
	const apiContext = useApiContext();
	const query = useQuery<NotificationCountResponse>({
		queryKey: [NOTIFICATIONS_CACHE_KEYS.count, ack],
		queryFn: () => countNotifications({
			handler: apiContext.notificationServers.rest,
			ack,
		}),
	});

	return useMemo(() => ({
		...query,
		count: query.data?.count ?? 0,
	}), [query]);
};

export { useNotificationsCount };
export type { UseNotificationsCountReturn };
