import { pageFromMeta } from "@shared/api";
import { webhookFromApi } from "../mutators";

import type { Page, PageParams } from "@shared/api";
import type { WebhookEndpoint } from "@entity/configuration";
import type { IWebhookRESTApiClient } from "../rest-client";


interface ListWebhooksRequest {
	handler: Pick<IWebhookRESTApiClient, 'list'>;
	enabled?: boolean;
	page?: PageParams;
}

interface ListWebhooksResponse {
	page: Page<WebhookEndpoint>;
}

async function listWebhooks(request: ListWebhooksRequest): Promise<ListWebhooksResponse> {
	const response = await request.handler.list({
		params: { 
			...(request.enabled === undefined ? {} : { enabled: request.enabled }),
			...request.page,
		},
	});

	return {
		page: pageFromMeta(
			response.data.map(webhookFromApi),
			response.meta,
		)
	};
}

export { listWebhooks };
export type { ListWebhooksRequest, ListWebhooksResponse };
