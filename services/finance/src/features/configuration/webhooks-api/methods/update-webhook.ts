import { webhookFromApi, webhookPatchToApi } from "../mutators";

import type { WebhookEndpoint, WebhookPatch } from "@entity/configuration";
import type { IWebhooksRESTApiClient } from "../rest-client";


interface UpdateWebhookRequest {
	handler: Pick<IWebhooksRESTApiClient, 'patch'>;
	id: string;
	patch: WebhookPatch;
}

type UpdateWebhookResponse = WebhookEndpoint;

async function updateWebhookEndpoint(request: UpdateWebhookRequest): Promise<UpdateWebhookResponse> {
	const response = await request.handler.patch({
		id: request.id,
		data: webhookPatchToApi(request.patch),
	});

	return webhookFromApi(response.data);
}

export { updateWebhookEndpoint };
export type { UpdateWebhookRequest, UpdateWebhookResponse };
