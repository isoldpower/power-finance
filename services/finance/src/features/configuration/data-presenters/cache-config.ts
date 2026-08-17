export const CACHE_KEYS = {
	list: 'webhooks',
	fetch: 'webhook',
	create: 'createWebhook',
	delete: 'deleteWebhook',
	update: 'updateWebhook',
	rotate: 'rotateWebhookSecret',
	eventTypes: 'webhook-event-types',
	subscriptions: 'webhook-subscriptions',
	subscribe: 'subscribeWebhook',
	unsubscribe: 'unsubscribeWebhook',
	deliveries: 'webhook-deliveries',
} as const;
