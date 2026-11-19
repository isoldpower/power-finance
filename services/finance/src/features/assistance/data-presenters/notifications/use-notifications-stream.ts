import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { subscribeNotifications } from "../../notifications-api";
import { useOptimisticNotifications } from "./optimistic";


const useNotificationsStream = (): void => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const { applyReceived } = useOptimisticNotifications();

	const invalidateAll = useCallback((): void => {
		for (const key of DERIVED_KEYS.onNotificationChange) {
			void queryClient.invalidateQueries({ queryKey: [key] });
		}
	}, [queryClient]);

	useEffect(() => {
		return subscribeNotifications({
			handler: apiContext.notificationServers.rest,
			onCreated: applyReceived,
			onAcknowledged: invalidateAll,
			onReconnect: invalidateAll,
		});
	}, [apiContext.notificationServers.rest, applyReceived, invalidateAll]);
};

export { useNotificationsStream };
