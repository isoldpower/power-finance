interface WebhookPreview {
	id: string
	url: string
	title: string
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
	meta: WebhookMeta
}

interface WebhookWithSecret {
	id: string
	url: string
	title: string
	meta: WebhookMeta
	secret: string
}

interface WebhookValuableFields {
	url: string
	title: string
}

export type { WebhookMeta, WebhookPreview, WebhookDetailed, WebhookWithSecret, WebhookValuableFields };
