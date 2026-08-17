import { pageFromMeta } from "@shared/api";
import { subscriptionFromApi } from "../mutators";
import type { Page, PageParams } from "@shared/api";
import type { WebhookSubscription } from "@entity/configuration";
import type { IWebhookRESTApiClient } from "../rest-client";

interface ListSubscriptionsRequest {
	handler: Pick<IWebhookRESTApiClient, 'listSubscriptions'>;
	webhookId: string;
	page?: PageParams;
}

interface ListSubscriptionsResponse {
	page: Page<WebhookSubscription>;
}

async function listSubscriptions(request: ListSubscriptionsRequest): Promise<ListSubscriptionsResponse> {
	const response = await request.handler.listSubscriptions({
		webhookId: request.webhookId,
		params: request.page,
	});

	return { page: pageFromMeta(response.data.map(subscriptionFromApi), response.meta) };
}

export { listSubscriptions };
export type { ListSubscriptionsRequest, ListSubscriptionsResponse };
