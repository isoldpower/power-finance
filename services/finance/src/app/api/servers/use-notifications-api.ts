import { useMemo } from "react";

import { NotificationsHttpRESTApiClient, NotificationsMockRESTApiClient } from "@feature/assistance";
import { useApiTokenGetter } from "../guest-demo/use-api-token-getter.ts";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { INotificationsRESTApiClient } from "@feature/assistance";
import type { ApiServerOptions } from "./types.ts";


const NOTIFICATIONS_PATH = '/notifications';

interface UseNotificationsApiResponse {
	rest: INotificationsRESTApiClient;
}

function useNotificationsApi(options: ApiServerOptions): UseNotificationsApiResponse {
	const axiosInstance = useResourceAxios(options, NOTIFICATIONS_PATH);
	const getToken = useApiTokenGetter(options);

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
