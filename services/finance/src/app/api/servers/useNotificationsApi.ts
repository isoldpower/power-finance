import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { NotificationsMockRESTApiClient, NotificationsDjangoRESTApiClient } from "@feature/assistance";
import type { INotificationsRESTApiClient } from "@feature/assistance";

const USE_DJANGO_BACKEND: boolean = false;

interface UseNotificationsApiResponse {
	rest: INotificationsRESTApiClient;
}

function useNotificationsApi(baseUrl: string): UseNotificationsApiResponse {
	const notificationsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/notifications`
	});

	const restNotificationsClient = useMemo<INotificationsRESTApiClient>(() => {
		return USE_DJANGO_BACKEND
			? new NotificationsDjangoRESTApiClient(notificationsAxiosInstance)
			: new NotificationsMockRESTApiClient();
	}, [notificationsAxiosInstance]);

	return useMemo(() => ({
		rest: restNotificationsClient
	}), [restNotificationsClient]);
}

export { useNotificationsApi };
export type { UseNotificationsApiResponse };
