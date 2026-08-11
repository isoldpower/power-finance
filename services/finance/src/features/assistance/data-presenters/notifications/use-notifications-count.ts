import { useApiContext } from "@app/api";
import { useResourceQuery } from "@shared/data";
import { NOTIFICATIONS_CACHE_KEYS } from "../cache-config.ts";
import { countNotifications } from "../../assistance-api";

import type { UseResourceQueryResult } from "@shared/data";
import type { NotificationCountResponse } from "../../assistance-api";


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
