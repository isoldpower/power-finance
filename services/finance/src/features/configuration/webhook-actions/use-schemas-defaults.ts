import type { DeletedWebhookSchema, WebhookSchema } from "./schemas.ts";
import type { WebhookEndpoint } from "@entity/configuration";


const useNewDefaultValues = (): WebhookSchema => {
	return {
		title: '',
		url: ''
	} satisfies WebhookSchema;
}

const useDeleteDefaultValues = (webhook: WebhookEndpoint): DeletedWebhookSchema => {
	return {
		id: webhook.id
	} satisfies DeletedWebhookSchema;
}

const useEditDefaultValues = (webhook: WebhookEndpoint): WebhookSchema => {
	return {
		url: webhook.url,
		title: webhook.title
	} satisfies WebhookSchema;
}

export { useNewDefaultValues, useDeleteDefaultValues, useEditDefaultValues };