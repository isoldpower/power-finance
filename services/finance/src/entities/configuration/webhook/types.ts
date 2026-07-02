interface WebhookEndpoint {
	id: string
	title: string
	url: string
	secret?: string
	createdAt?: string
	updatedAt?: string
}

export type { WebhookEndpoint };
