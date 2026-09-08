import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { subscribeNotifications } from "../../notifications-api";
import { NOTIFICATIONS_CACHE_KEYS } from "../cache-config.ts";

import type { NotificationCounts } from "@entity/assistance";


const useNotificationsStream = (): void => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	const invalidateAll = useCallback((): void => {
		for (const key of DERIVED_KEYS.onNotificationChange) {
			void queryClient.invalidateQueries({ queryKey: [key] });
		}
	}, [queryClient]);

	const bumpUnacknowledged = useCallback((): void => {
		queryClient.setQueryData<NotificationCounts>(
			[NOTIFICATIONS_CACHE_KEYS.count],
			(counts) => counts && {
				unacknowledged: counts.unacknowledged + 1,
				total: counts.total + 1,
			},
		);
		void queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_CACHE_KEYS.list] });
	}, [queryClient]);

	useEffect(() => {
		return subscribeNotifications({
			handler: apiContext.notificationServers.rest,
			onCreated: bumpUnacknowledged,
			onAcknowledged: invalidateAll,
			onReconnect: invalidateAll,
		});
	}, [apiContext.notificationServers.rest, bumpUnacknowledged, invalidateAll]);
};

export { useNotificationsStream };
