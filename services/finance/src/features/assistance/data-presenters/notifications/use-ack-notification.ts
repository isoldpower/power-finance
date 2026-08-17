import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext, DERIVED_KEYS } from "@app/api";
import { ackNotification } from "../../notifications-api";
import { NOTIFICATIONS_CACHE_KEYS } from "../cache-config.ts";

const useAckNotification = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [NOTIFICATIONS_CACHE_KEYS.ack],
		mutationFn: (id: string) => ackNotification({
			handler: apiContext.notificationServers.rest,
			id,
		}),
		onSettled: () => {
			for (const key of DERIVED_KEYS.onNotificationChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useAckNotification };
