import { useMemo } from "react";
import { clerk } from "@internal/shared";

import { NotificationsHttpRESTApiClient, NotificationsMockRESTApiClient } from "@feature/assistance";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { INotificationsRESTApiClient } from "@feature/assistance";
import type { ApiServerOptions } from "./types.ts";


const NOTIFICATIONS_PATH = '/notifications';

interface UseNotificationsApiResponse {
	rest: INotificationsRESTApiClient;
}

function useNotificationsApi(options: ApiServerOptions): UseNotificationsApiResponse {
	const axiosInstance = useResourceAxios(options, NOTIFICATIONS_PATH);
	const { getToken } = clerk.useAuth();

	const restClient = useMemo<INotificationsRESTApiClient>(() => {
		return options.mode === 'live'
			? new NotificationsHttpRESTApiClient(axiosInstance, options.versions, () => getToken())
			: new NotificationsMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions, getToken]);

	return useMemo(() => ({
		rest: restClient
	}), [restClient]);
}

export { useNotificationsApi };
export type { UseNotificationsApiResponse };
