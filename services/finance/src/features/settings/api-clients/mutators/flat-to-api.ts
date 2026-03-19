import { WebhookEndpoint } from "@entity/settings/webhook";
import { WebhookPreview, WebhookDetailed } from "../types.ts";

const flatToWebhookPreview = (
	flat: WebhookEndpoint
): WebhookPreview => {
	const { id, url, title, subscribed } = flat;

	return { id, url, title, subscribed };
}

const flatToWebhookDetailed = (
	flat: WebhookEndpoint
): WebhookDetailed => {
	const { id, url, title, subscribed, secret, createdAt, updatedAt } = flat;

	return {
		id, url, title, subscribed, secret,
		meta: {
			id,
			created_at: createdAt ?? '',
			updated_at: updatedAt ?? ''
		}
	};
}

export { flatToWebhookPreview, flatToWebhookDetailed };