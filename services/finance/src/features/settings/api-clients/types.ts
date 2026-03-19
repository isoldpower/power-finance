interface WebhookPreview {
	id: string
	url: string
	title: string
	subscribed: string[]
}

interface WebhookMeta {
	id: string
	created_at: string
	updated_at: string
}

interface WebhookDetailed {
	id: string
	url: string
	title: string
	subscribed: string[]
	secret?: string
	meta: WebhookMeta
}

interface WebhookValuableFields {
	url: string
	title: string
	subscribed: string[]
}

export type { WebhookMeta, WebhookPreview, WebhookDetailed, WebhookValuableFields };