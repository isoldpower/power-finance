import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { WebhookMockRESTApiClient } from "@feature/configuration";
import type { IWebhookRESTApiClient } from "@feature/configuration";


interface UseWebhookApiResponse {
	rest: IWebhookRESTApiClient;
}

function useWebhooksApi(baseUrl: string): UseWebhookApiResponse {
	const webhookAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/webhooks`
	});

	const restWebhookClient = useMemo<IWebhookRESTApiClient>(() => {
		return new WebhookMockRESTApiClient();
	}, [webhookAxiosInstance]);

	return useMemo(() => ({
		rest: restWebhookClient
	}), [restWebhookClient]);
}

export { useWebhooksApi };
export type { UseWebhookApiResponse };
