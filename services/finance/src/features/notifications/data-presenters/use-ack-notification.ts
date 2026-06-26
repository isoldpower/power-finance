import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { ackNotification } from "@feature/notifications";
import { CACHE_KEYS } from "./cache-config.ts";

const useAckNotification = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [CACHE_KEYS.ack],
		mutationFn: (id: string) => ackNotification({
			handler: apiContext.notificationServers.rest,
			id,
		}),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.list] });
			void queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.count] });
		},
	});
};

export { useAckNotification };
