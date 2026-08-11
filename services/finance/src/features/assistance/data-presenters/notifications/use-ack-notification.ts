import { useApiContext } from "@app/api";
import { useResourceMutation } from "@shared/data";
import { ackNotification } from "../../assistance-api";
import { NOTIFICATIONS_CACHE_KEYS } from "../cache-config.ts";

import type { NotificationAckResponse, ListNotificationsResponse } from "../../assistance-api";


interface AckNotificationVariables {
	ack: boolean;
}

const useAckNotification = (id: string) => {
	const apiContext = useApiContext();

	return useResourceMutation<AckNotificationVariables, NotificationAckResponse, ListNotificationsResponse>({
		key: [NOTIFICATIONS_CACHE_KEYS.ack],
		mutate: ({ ack }) => ackNotification({ 
			handler: apiContext.notificationServers.rest,
			id,
			ack,
		}),
		invalidates: [[NOTIFICATIONS_CACHE_KEYS.count]],
		optimistic: {
			key: [NOTIFICATIONS_CACHE_KEYS.list],
			apply: (previous, { ack }) => previous
				? {
					...previous,
					data: previous.data.map((notification) => notification.id === id
						? { ...notification, ack }
						: notification),
				}
				: previous,
		},
	});
};

export { useAckNotification };
export type { AckNotificationVariables };
