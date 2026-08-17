import { subscriptionFromApi } from "../mutators";
import type { WebhookSubscription } from "@entity/configuration";
import type { IWebhookRESTApiClient } from "../rest-client";

interface SubscribeWebhookRequest {
	handler: Pick<IWebhookRESTApiClient, 'subscribe'>;
	webhookId: string;
	event: string;
	idempotencyKey?: string;
}

type SubscribeWebhookResponse = WebhookSubscription;

async function subscribeWebhook(request: SubscribeWebhookRequest): Promise<SubscribeWebhookResponse> {
	const response = await request.handler.subscribe({
		webhookId: request.webhookId,
		data: { event: request.event },
		idempotencyKey: request.idempotencyKey,
	});

	return subscriptionFromApi(response.data);
}

export { subscribeWebhook };
export type { SubscribeWebhookRequest, SubscribeWebhookResponse };
