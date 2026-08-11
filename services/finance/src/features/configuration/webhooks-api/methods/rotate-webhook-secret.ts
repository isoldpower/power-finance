import type { WebhookEndpoint } from "@entity/configuration";
import type { IWebhookRESTApiClient, WebhookRotateRequest } from "../rest-client";
import { webhookWithSecretResponseToFlat as webhookDetailedResponseToFlat } from "../mutators/api-to-flat.ts";


interface RotateWebhookSecretRequest {
	handler: Pick<IWebhookRESTApiClient, 'rotateSecret'>
	payload: WebhookRotateRequest
}

type RotateWebhookSecretResponse = WebhookEndpoint & object;

async function rotateWebhookSecret(
	request: RotateWebhookSecretRequest
): Promise<RotateWebhookSecretResponse> {
	return request.handler.rotateSecret(request.payload)
		.then(webhookDetailedResponseToFlat)
}

export { rotateWebhookSecret };
export type { RotateWebhookSecretRequest, RotateWebhookSecretResponse };