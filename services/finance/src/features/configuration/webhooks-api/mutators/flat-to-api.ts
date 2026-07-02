import type { WebhookEndpoint } from "@entity/configuration/webhook";
import type { WebhookPreview, WebhookDetailed } from "../types.ts";

const flatToWebhookPreview = (
	flat: WebhookEndpoint
): WebhookPreview => {
	const { id, url, title } = flat;

	return { id, url, title };
}

const flatToWebhookDetailed = (
	flat: WebhookEndpoint
): WebhookDetailed => {
	const { id, url, title, createdAt, updatedAt } = flat;

	return {
		id, url, title,
		meta: {
			id,
			created_at: createdAt ?? '',
			updated_at: updatedAt ?? ''
		}
	};
}

export { flatToWebhookPreview, flatToWebhookDetailed };
