import { WebhookEndpoint } from "@entity/settings/webhook";
import { WebhookPreview, WebhookDetailed } from "../types.ts";

const webhookPreviewResponseToFlat = (
	response: WebhookPreview
): WebhookEndpoint => {
	return { 
		...response
	} satisfies WebhookEndpoint;
}

const webhookDetailedResponseToFlat = (
	response: WebhookDetailed
): WebhookEndpoint => {
	const { meta, ...data } = response;

	return {
		...data,
		...meta,
		createdAt: meta.created_at,
		updatedAt: meta.updated_at
	} satisfies WebhookEndpoint;
}

export { webhookPreviewResponseToFlat, webhookDetailedResponseToFlat };