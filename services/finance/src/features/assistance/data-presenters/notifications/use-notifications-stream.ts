import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { subscribeNotifications } from "../../notifications-api";


const useNotificationsStream = (): void => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	useEffect(() => {
		const invalidate = (): void => {
			for (const key of DERIVED_KEYS.onNotificationChange) {
				void queryClient.invalidateQueries({ 
					queryKey: [key]
				});
			}
		};

		return subscribeNotifications({
			handler: apiContext.notificationServers.rest,
			onCreated: invalidate,
			onAcknowledged: invalidate,
		});
	}, [apiContext.notificationServers.rest, queryClient]);
};

export { useNotificationsStream };
