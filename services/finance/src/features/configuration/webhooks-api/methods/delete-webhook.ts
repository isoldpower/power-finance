import type { IWebhookRESTApiClient } from "../rest-client";
import { deleteToFlat } from "../mutators/delete-to-flat.ts";


interface DeleteWebhookRequest {
	handler: Pick<IWebhookRESTApiClient, 'delete'>
	id: string
}

interface DeleteWebhookResponse {
	message: string
	id: string | null
}

async function deleteWebhookEndpoint(
	request: DeleteWebhookRequest
): Promise<DeleteWebhookResponse> {
	return request.handler.delete({ id: request.id })
		.then(deleteToFlat);
}

export { deleteWebhookEndpoint };
export type { DeleteWebhookRequest, DeleteWebhookResponse };