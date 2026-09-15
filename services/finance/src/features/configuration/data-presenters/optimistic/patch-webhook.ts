import type { WebhookEndpoint, WebhookPatch } from "@entity/configuration";


const patchWebhook = (webhook: WebhookEndpoint, patch: WebhookPatch): WebhookEndpoint => ({
	...webhook,
	title: patch.title ?? webhook.title,
	url: patch.url ?? webhook.url,
	enabled: patch.enabled ?? webhook.enabled,
});

export { patchWebhook };
