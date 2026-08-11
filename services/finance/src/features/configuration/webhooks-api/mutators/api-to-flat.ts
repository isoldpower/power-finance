import type { WebhookEndpoint } from "@entity/configuration";
import type { WebhookPreview, WebhookDetailed, WebhookWithSecret } from "../types.ts";

const webhookPreviewResponseToFlat = (
	response: WebhookPreview
): WebhookEndpoint => {
	return {
		id: response.id,
		url: response.url,
		title: response.title,
	} satisfies WebhookEndpoint;
}

const webhookDetailedResponseToFlat = (
	response: WebhookDetailed
): WebhookEndpoint => {
	const { meta, ...data } = response;

	return {
		...data,
		createdAt: meta.created_at,
		updatedAt: meta.updated_at
	} satisfies WebhookEndpoint;
}

const webhookWithSecretResponseToFlat = (
	response: WebhookWithSecret
): WebhookEndpoint => {
	const { meta, secret, ...data } = response;

	return {
		...data,
		secret,
		createdAt: meta.created_at,
		updatedAt: meta.updated_at
	} satisfies WebhookEndpoint;
}

export { webhookPreviewResponseToFlat, webhookDetailedResponseToFlat, webhookWithSecretResponseToFlat };
