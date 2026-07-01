import type { WebhookEndpoint } from "@entity/settings/webhook";
import type { IWebhookRESTApiClient } from "../rest-client/types.ts";
import { webhookPreviewResponseToFlat } from "../mutators/api-to-flat.ts";


interface ListWebhooksRequest {
	handler: Pick<IWebhookRESTApiClient, 'list'>;
}

interface ListWebhooksResponse {
	data: WebhookEndpoint[];
	meta: {
		limit: number
		offset: number
		total: number
	}
}

async function listWebhooks(
	request: ListWebhooksRequest
): Promise<ListWebhooksResponse> {
	return request.handler.list({ params: {} })
		.then((response) => ({
			...response,
			data: response.data.map(webhookPreviewResponseToFlat),
		}))
}

export { listWebhooks };
export type { ListWebhooksRequest, ListWebhooksResponse };