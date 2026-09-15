import { CACHE_KEYS } from "../cache-config.ts";

import type { QueryKey } from "@tanstack/react-query";
import type { OptimisticResource } from "@shared/data";
import type { WebhookEndpoint, WebhookSubscription } from "@entity/configuration";


const ALWAYS_OPEN = (): boolean => true;

const belongsToWebhook = (key: QueryKey, subscription: WebhookSubscription): boolean => {
	const [, webhookId] = key;

	return webhookId === subscription.webhookId;
};

const WEBHOOK_RESOURCE: OptimisticResource<WebhookEndpoint, WebhookEndpoint, WebhookEndpoint> = {
	paged: [{ key: CACHE_KEYS.list }],
	details: [
		{
			key: CACHE_KEYS.fetch,
			read: (response) => response,
			write: (_response, webhook) => webhook,
		},
	],
};

const SUBSCRIPTION_RESOURCE: OptimisticResource<WebhookSubscription, never, never> = {
	paged: [
		{
			key: CACHE_KEYS.subscriptions,
			accepts: belongsToWebhook,
			isFirstPage: ALWAYS_OPEN,
		},
	],
};

export { SUBSCRIPTION_RESOURCE, WEBHOOK_RESOURCE };
