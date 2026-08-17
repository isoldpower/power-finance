import { webhookFromApi } from "../mutators";
import type { WebhookEndpoint } from "@entity/configuration";
import type { IWebhookRESTApiClient } from "../rest-client";

interface DeleteWebhookRequest {
	handler: Pick<IWebhookRESTApiClient, 'delete'>;
	id: string;
}

type DeleteWebhookResponse = WebhookEndpoint;

async function deleteWebhookEndpoint(request: DeleteWebhookRequest): Promise<DeleteWebhookResponse> {
	const response = await request.handler.delete({ id: request.id });

	return webhookFromApi(response.data);
}

export { deleteWebhookEndpoint };
export type { DeleteWebhookRequest, DeleteWebhookResponse };
