import { useMemo } from "react";

import { WebhooksHttpRESTApiClient, WebhooksMockRESTApiClient } from "@feature/configuration";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { IWebhooksRESTApiClient } from "@feature/configuration";
import type { ApiServerOptions } from "./types.ts";


const WEBHOOKS_PATH = '/webhooks';

interface UseWebhooksApiResponse {
	rest: IWebhooksRESTApiClient;
}

function useWebhooksApi(options: ApiServerOptions): UseWebhooksApiResponse {
	const axiosInstance = useResourceAxios(options, WEBHOOKS_PATH);

	const restClient = useMemo<IWebhooksRESTApiClient>(() => {
		return options.mode === 'live'
			? new WebhooksHttpRESTApiClient(axiosInstance, options.versions)
			: new WebhooksMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions]);

	return useMemo(() => ({
		rest: restClient
	}), [restClient]);
}

export { useWebhooksApi };
export type { UseWebhooksApiResponse };
