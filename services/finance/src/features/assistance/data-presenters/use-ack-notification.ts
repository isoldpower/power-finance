import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { ackNotification } from "../notifications-api";
import { NOTIFICATIONS_CACHE_KEYS } from "./cache-config.ts";


const useAckNotification = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [NOTIFICATIONS_CACHE_KEYS.ack],
		mutationFn: (id: string) => ackNotification({
			handler: apiContext.notificationServers.rest,
			id,
		}),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_CACHE_KEYS.list] });
			void queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_CACHE_KEYS.count] });
		},
	});
};

export { useAckNotification };
