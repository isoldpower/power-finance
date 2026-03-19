import type { IWebhookRESTApiClient } from "../rest-client/types.ts";
import { deleteToFlat } from "../mutators/delete-to-flat.ts";


interface DeleteWebhookRequest {
	handler: Pick<IWebhookRESTApiClient, 'delete'>
	id: string
}

interface DeleteWebhookResponse {
	message: string
	id: string
	success: boolean
}

async function deleteWebhookEndpoint(
	request: DeleteWebhookRequest
): Promise<DeleteWebhookResponse> {
	return request.handler.delete({ id: request.id })
		.then(deleteToFlat);
}

export { deleteWebhookEndpoint };
export type { DeleteWebhookRequest, DeleteWebhookResponse };