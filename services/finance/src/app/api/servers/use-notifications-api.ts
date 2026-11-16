import { useMemo } from "react";
import { DEMO_SESSION_HEADER, SANDBOX_HEADER } from "@internal/shared";

import { NotificationsHttpRESTApiClient, NotificationsMockRESTApiClient } from "@feature/assistance";
import { useApiTokenGetter } from "./use-api-token-getter.ts";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { INotificationsRESTApiClient } from "@feature/assistance";
import type { ApiServerOptions } from "./types.ts";


const NOTIFICATIONS_PATH = '/notifications';

interface UseNotificationsApiResponse {
	rest: INotificationsRESTApiClient;
}

function useNotificationsApi(options: ApiServerOptions): UseNotificationsApiResponse {
	const axiosInstance = useResourceAxios(options, NOTIFICATIONS_PATH);
	const getToken = useApiTokenGetter();
	const streamHeaders = useMemo<Record<string, string>>(() => ({
		...(options.sandbox ? { [SANDBOX_HEADER]: options.sandbox } : {}),
		...(options.demoSession ? { [DEMO_SESSION_HEADER]: options.demoSession } : {}),
	}), [options.sandbox, options.demoSession]);

	const restClient = useMemo<INotificationsRESTApiClient>(() => {
		return options.mode === 'live'
			? new NotificationsHttpRESTApiClient(axiosInstance, options.versions, () => getToken(), streamHeaders)
			: new NotificationsMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions, getToken, streamHeaders]);

	return useMemo(() => ({
		rest: restClient
	}), [restClient]);
}

export { useNotificationsApi };
export type { UseNotificationsApiResponse };
