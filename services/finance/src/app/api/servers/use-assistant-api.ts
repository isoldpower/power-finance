import { useMemo } from "react";
import { toSocketUrl } from "@shared/api";

import { AssistantHttpRESTApiClient, AssistantMockRESTApiClient } from "@feature/assistance";
import { API_BASE_PATH } from "../config.ts";
import { useApiTokenGetter } from "../guest-demo/use-api-token-getter.ts";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { IAssistantRESTApiClient } from "@feature/assistance";
import type { ApiServerOptions } from "./types.ts";


const ASSISTANT_PATH = '/assistant';
const ADVICE_SOCKET_PATH = '/chat/advice';

interface UseAssistantApiResponse {
	rest: IAssistantRESTApiClient;
}

function useAssistantApi(options: ApiServerOptions): UseAssistantApiResponse {
	const axiosInstance = useResourceAxios(options, ASSISTANT_PATH);
	const getToken = useApiTokenGetter(options);

	const restClient = useMemo<IAssistantRESTApiClient>(() => {
		if (options.mode !== 'live') {
			return new AssistantMockRESTApiClient();
		}

		return new AssistantHttpRESTApiClient(axiosInstance, options.versions, {
			url: toSocketUrl(`${options.baseUrl}${API_BASE_PATH}${ADVICE_SOCKET_PATH}`, {
				sandbox: options.sandbox,
				demoSession: options.demoSession,
			}),
			authorize: () => getToken(),
		});
	}, [
		axiosInstance,
		options.mode,
		options.versions,
		options.baseUrl,
		options.sandbox,
		options.demoSession,
		getToken
	]);

	return useMemo(() => ({
		rest: restClient
	}), [restClient]);
}

export { useAssistantApi };
export type { UseAssistantApiResponse };
