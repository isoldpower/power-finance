import { useMemo } from "react";
import { IWebhookRESTApiClient, WebhookDjangoRESTApiClient } from "@feature/configuration";
import { useAxiosInstance } from "@internal/shared";


interface UseWebhookApiResponse {
	rest: IWebhookRESTApiClient;
}

function useWebhooksApi(baseUrl: string): UseWebhookApiResponse {
	const webhookAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/webhooks`
	});

	const restWebhookClient = useMemo<IWebhookRESTApiClient>(() => {
		return new WebhookDjangoRESTApiClient(webhookAxiosInstance);
	}, [webhookAxiosInstance]);

	return useMemo(() => ({
		rest: restWebhookClient
	}), [restWebhookClient]);
}

export { useWebhooksApi };
