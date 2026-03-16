import { WebhookSchema } from "./schemas.ts";


const useNewDefaultValues = (): WebhookSchema => {
	return {
		title: '',
		url: 'https://example.com/webhook'
	};
}

export { useNewDefaultValues };