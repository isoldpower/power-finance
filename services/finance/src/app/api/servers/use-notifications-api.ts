import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { NotificationsMockRESTApiClient } from "@feature/assistance";
import { API_BASE_PATH } from "../config.ts";
import type { INotificationsRESTApiClient } from "@feature/assistance";

interface UseNotificationsApiResponse {
	rest: INotificationsRESTApiClient;
}

function useNotificationsApi(baseUrl: string): UseNotificationsApiResponse {
	const notificationsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}${API_BASE_PATH}/notifications`
	});

	const restNotificationsClient = useMemo<INotificationsRESTApiClient>(() => {
		return new NotificationsMockRESTApiClient();
	}, [notificationsAxiosInstance]);

	return useMemo(() => ({
		rest: restNotificationsClient
	}), [restNotificationsClient]);
}

export { useNotificationsApi };
export type { UseNotificationsApiResponse };
