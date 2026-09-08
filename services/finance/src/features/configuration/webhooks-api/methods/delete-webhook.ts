import { webhookFromApi } from "../mutators";

import type { WebhookEndpoint } from "@entity/configuration";
import type { IWebhooksRESTApiClient } from "../rest-client";


interface DeleteWebhookRequest {
	handler: Pick<IWebhooksRESTApiClient, 'delete'>;
	id: string;
}

type DeleteWebhookResponse = WebhookEndpoint;

async function deleteWebhookEndpoint(request: DeleteWebhookRequest): Promise<DeleteWebhookResponse> {
	const response = await request.handler.delete({
		id: request.id
	});

	return webhookFromApi(response.data);
}

export { deleteWebhookEndpoint };
export type { DeleteWebhookRequest, DeleteWebhookResponse };
