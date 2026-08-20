import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { WebhookMockRESTApiClient } from "@feature/configuration";
import { API_BASE_PATH } from "../config.ts";
import type { IWebhookRESTApiClient } from "@feature/configuration";

interface UseWebhooksApiResponse {
	rest: IWebhookRESTApiClient;
}

function useWebhooksApi(baseUrl: string): UseWebhooksApiResponse {
	const webhooksAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}${API_BASE_PATH}/webhooks`
	});

	const restWebhooksClient = useMemo<IWebhookRESTApiClient>(() => {
		return new WebhookMockRESTApiClient();
	}, [webhooksAxiosInstance]);

	return useMemo(() => ({
		rest: restWebhooksClient
	}), [restWebhooksClient]);
}

export { useWebhooksApi };
export type { UseWebhooksApiResponse };
