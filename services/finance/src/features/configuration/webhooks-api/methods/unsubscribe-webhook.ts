import { subscriptionFromApi } from "../mutators";

import type { WebhookSubscription } from "@entity/configuration";
import type { IWebhooksRESTApiClient } from "../rest-client";


interface UnsubscribeWebhookRequest {
	handler: Pick<IWebhooksRESTApiClient, 'unsubscribe'>;
	webhookId: string;
	subscriptionId: string;
}

type UnsubscribeWebhookResponse = WebhookSubscription;

async function unsubscribeWebhook(request: UnsubscribeWebhookRequest): Promise<UnsubscribeWebhookResponse> {
	const response = await request.handler.unsubscribe({
		webhookId: request.webhookId,
		subscriptionId: request.subscriptionId,
	});

	return subscriptionFromApi(response.data);
}

export { unsubscribeWebhook };
export type { UnsubscribeWebhookRequest, UnsubscribeWebhookResponse };
