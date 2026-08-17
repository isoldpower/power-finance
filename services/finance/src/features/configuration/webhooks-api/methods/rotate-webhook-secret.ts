import { webhookSecretFromApi } from "../mutators";
import type { WebhookEndpointSecret } from "@entity/configuration";
import type { IWebhookRESTApiClient } from "../rest-client";

interface RotateWebhookSecretRequest {
	handler: Pick<IWebhookRESTApiClient, 'rotateSecret'>;
	id: string;
	idempotencyKey?: string;
}

type RotateWebhookSecretResponse = WebhookEndpointSecret;

async function rotateWebhookSecret(
	request: RotateWebhookSecretRequest
): Promise<RotateWebhookSecretResponse> {
	const response = await request.handler.rotateSecret({
		id: request.id,
		idempotencyKey: request.idempotencyKey,
	});

	return webhookSecretFromApi(response.data);
}

export { rotateWebhookSecret };
export type { RotateWebhookSecretRequest, RotateWebhookSecretResponse };
