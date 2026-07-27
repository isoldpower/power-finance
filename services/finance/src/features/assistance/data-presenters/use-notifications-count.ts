import { useApiContext } from "@app/api";
import { useResourceQuery } from "@shared/data";
import type { UseResourceQueryResult } from "@shared/data";
import { countNotifications } from "../notifications-api";
import { NOTIFICATIONS_CACHE_KEYS } from "./cache-config.ts";
import type { NotificationCountResponse } from "../notifications-api";


type UseNotificationsCountReturn = UseResourceQueryResult<NotificationCountResponse, number> & {
	count: number;
};

const useNotificationsCount = (ack = false): UseNotificationsCountReturn => {
	const apiContext = useApiContext();
	const query = useResourceQuery<NotificationCountResponse, number>({
		key: [NOTIFICATIONS_CACHE_KEYS.count, ack],
		fetch: () => countNotifications({
			handler: apiContext.notificationServers.rest,
			ack,
		}),
		select: (response) => response.count,
		fallback: 0,
	});

	return { ...query, count: query.value };
};

export { useNotificationsCount };
export type { UseNotificationsCountReturn };
