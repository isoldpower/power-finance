import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { ackNotification } from "../../notifications-api";
import { NOTIFICATIONS_CACHE_KEYS } from "../cache-config.ts";
import { useOptimisticNotifications } from "./optimistic";

import type { UseMutationResult } from "@tanstack/react-query";
import type { AckNotificationResponse } from "../../notifications-api";
import type { NotificationCachesSnapshot } from "./optimistic";


const useAckNotification = (): UseMutationResult<
	AckNotificationResponse,
	Error,
	string,
	NotificationCachesSnapshot
> => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const optimistic = useOptimisticNotifications();

	return useMutation<AckNotificationResponse, Error, string, NotificationCachesSnapshot>({
		mutationKey: [NOTIFICATIONS_CACHE_KEYS.ack],
		mutationFn: (id: string) => ackNotification({
			handler: apiContext.notificationServers.rest,
			id,
		}),
		onMutate: async (id: string) => {
			const snapshot = await optimistic.capture();
			optimistic.applyAcknowledge(id, new Date().toISOString());

			return snapshot;
		},
		onError: (_error, _id, snapshot) => {
			optimistic.restore(snapshot);
		},
		onSuccess: (notification, id) => {
			optimistic.applySettled(id, notification);
		},
		onSettled: () => {
			for (const key of DERIVED_KEYS.onNotificationChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
};

export { useAckNotification };
