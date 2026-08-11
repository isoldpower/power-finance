import type { WebhookEndpoint } from "@entity/configuration";
import type { IWebhookRESTApiClient, WebhookPostRequest } from "../rest-client";
import { webhookWithSecretResponseToFlat } from "../mutators/api-to-flat.ts";


interface CreateWebhookRequest {
	handler: Pick<IWebhookRESTApiClient, 'post'>
	payload: WebhookPostRequest
}

type CreateWebhookResponse = WebhookEndpoint & object;

async function createWebhookEndpoint(
	request: CreateWebhookRequest
): Promise<CreateWebhookResponse> {
	return request.handler.post(request.payload)
		.then(webhookWithSecretResponseToFlat)
}

export { createWebhookEndpoint };
export type { CreateWebhookRequest, CreateWebhookResponse };