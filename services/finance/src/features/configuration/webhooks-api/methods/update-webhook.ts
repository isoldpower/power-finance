import type { WebhookEndpoint } from "@entity/settings/webhook";
import type { IWebhookRESTApiClient, WebhookUpdateRequest } from "../rest-client/types.ts";
import { webhookDetailedResponseToFlat } from "../mutators/api-to-flat.ts";


interface UpdateWebhookRequest {
	handler: Pick<IWebhookRESTApiClient, 'patch'>
	payload: WebhookUpdateRequest
}

type UpdateWebhookResponse = WebhookEndpoint & object;

async function updateWebhookEndpoint(
	request: UpdateWebhookRequest
): Promise<UpdateWebhookResponse> {
	return request.handler.patch(request.payload)
		.then(webhookDetailedResponseToFlat)
}

export { updateWebhookEndpoint };
export type { UpdateWebhookRequest, UpdateWebhookResponse };