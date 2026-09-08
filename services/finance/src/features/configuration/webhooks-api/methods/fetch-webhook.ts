import { webhookFromApi } from "../mutators";

import type { WebhookEndpoint } from "@entity/configuration";
import type { IWebhooksRESTApiClient } from "../rest-client";


interface FetchWebhookRequest {
	handler: Pick<IWebhooksRESTApiClient, 'get'>;
	id: string;
}

type FetchWebhookResponse = WebhookEndpoint;

async function fetchWebhookEndpoint(request: FetchWebhookRequest): Promise<FetchWebhookResponse> {
	const response = await request.handler.get({ 
		id: request.id
	});

	return webhookFromApi(response.data);
}

export { fetchWebhookEndpoint };
export type { FetchWebhookRequest, FetchWebhookResponse };
