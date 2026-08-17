interface WebhookEndpoint {
	id: string;
	createdAt: string;
	updatedAt: string | null;
	title: string;
	url: string;
	enabled: boolean;
}

interface WebhookEndpointSecret extends WebhookEndpoint {
	secret: string;
}

interface WebhookDraft {
	title: string;
	url: string;
	enabled: boolean;
}

interface WebhookPatch {
	title?: string;
	url?: string;
	enabled?: boolean;
}

interface WebhookEventType {
	event: string;
	subject: string;
	description: string;
}

interface WebhookSubscription {
	id: string;
	createdAt: string;
	webhookId: string;
	event: string;
}

type DeliveryStatus = 'pending' | 'in_progress' | 'retry_scheduled' | 'success' | 'failed';

interface WebhookDelivery {
	id: string;
	createdAt: string;
	updatedAt: string | null;
	webhookId: string;
	eventId: string;
	event: string;
	targetUrl: string;
	status: DeliveryStatus;
	attempts: number;
	nextAttemptAt: string | null;
	lastError: string | null;
}

interface DeliveryQuery {
	status?: DeliveryStatus;
	event?: string;
}

export type {
	DeliveryQuery,
	DeliveryStatus,
	WebhookDelivery,
	WebhookDraft,
	WebhookEndpoint,
	WebhookEndpointSecret,
	WebhookEventType,
	WebhookPatch,
	WebhookSubscription,
};

type SettingsTab = 'preferences' | 'webhooks';

export type { SettingsTab };
