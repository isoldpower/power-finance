import { webhookDraftToApi, webhookSecretFromApi } from "../mutators";
import type { WebhookDraft, WebhookEndpointSecret } from "@entity/configuration";
import type { IWebhookRESTApiClient } from "../rest-client";

interface CreateWebhookRequest {
	handler: Pick<IWebhookRESTApiClient, 'post'>;
	draft: WebhookDraft;
	idempotencyKey?: string;
}

interface CreateWebhookResponse {
	webhook: WebhookEndpointSecret;
	replayed: boolean;
}

async function createWebhookEndpoint(request: CreateWebhookRequest): Promise<CreateWebhookResponse> {
	const response = await request.handler.post({
		data: webhookDraftToApi(request.draft),
		idempotencyKey: request.idempotencyKey,
	});

	return {
		webhook: webhookSecretFromApi(response.data),
		replayed: response.meta.idempotent_replay ?? false,
	};
}

export { createWebhookEndpoint };
export type { CreateWebhookRequest, CreateWebhookResponse };
