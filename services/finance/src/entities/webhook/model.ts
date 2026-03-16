interface WebhookEndpoint {
	id: string
	title: string
	url: string
	secret?: string
	subscribed: string[]
	createdAt?: string
	updatedAt?: string
}

export type { WebhookEndpoint };