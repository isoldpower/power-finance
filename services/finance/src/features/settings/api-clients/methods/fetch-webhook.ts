import type { IWebhookRESTApiClient, WebhookGetRequest } from "../rest-client/types.ts";
import { webhookDetailedResponseToFlat } from "../mutators/api-to-flat.ts";
import {WebhookEndpoint} from "@entity/settings";


interface FetchWebhookRequest {
	handler: Pick<IWebhookRESTApiClient, 'get'>
	payload: WebhookGetRequest
}

type FetchWebhookResponse = WebhookEndpoint & object;

async function fetchWebhookEndpoint(
	request: FetchWebhookRequest
): Promise<FetchWebhookResponse> {
	return request.handler.get(request.payload)
		.then(webhookDetailedResponseToFlat);
}

export { fetchWebhookEndpoint };
export type { FetchWebhookRequest, FetchWebhookResponse };