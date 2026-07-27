import { useApiContext } from "@app/api";
import { useResourceMutation } from "@shared/data";
import { ackNotification } from "../notifications-api";
import { NOTIFICATIONS_CACHE_KEYS } from "./cache-config.ts";
import type { NotificationAckResponse, ListNotificationsResponse } from "../notifications-api";


const useAckNotification = () => {
	const apiContext = useApiContext();

	return useResourceMutation<string, NotificationAckResponse, ListNotificationsResponse>({
		key: [NOTIFICATIONS_CACHE_KEYS.ack],
		mutate: (id) => ackNotification({ handler: apiContext.notificationServers.rest, id }),
		invalidates: [[NOTIFICATIONS_CACHE_KEYS.count]],
		optimistic: {
			key: [NOTIFICATIONS_CACHE_KEYS.list],
			apply: (previous, id) => previous
				? {
					...previous,
					data: previous.data.map((notification) => notification.id === id
						? { ...notification, ack: true }
						: notification),
				}
				: previous,
		},
	});
};

export { useAckNotification };
