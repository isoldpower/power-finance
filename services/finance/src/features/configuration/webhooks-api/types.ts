import type { PageParams } from "@shared/api";

type DeliveryStatusDto = 'pending' | 'in_progress' | 'retry_scheduled' | 'success' | 'failed';

interface WebhookDto {
	id: string;
	created_at: string;
	updated_at: string | null;
	title: string;
	url: string;
	enabled: boolean;
}

interface WebhookSecretDto extends WebhookDto {
	secret: string;
}

interface WebhookEventTypeDto {
	event: string;
	subject: string;
	description: string;
}

interface WebhookSubscriptionDto {
	id: string;
	created_at: string;
	webhook_id: string;
	event: string;
}

interface WebhookDeliveryDto {
	id: string;
	created_at: string;
	updated_at: string | null;
	webhook_id: string;
	event_id: string;
	event: string;
	target_url: string;
	status: DeliveryStatusDto;
	attempts: number;
	next_attempt_at: string | null;
	last_error: string | null;
}

interface WebhookCreateBody {
	title: string;
	url: string;
	enabled?: boolean;
}

interface WebhookPatchBody {
	title?: string;
	url?: string;
	enabled?: boolean;
}

interface SubscriptionCreateBody {
	event: string;
}

interface WebhookListParams extends PageParams {
	enabled?: boolean;
}

interface DeliveryListParams extends PageParams {
	status?: DeliveryStatusDto;
	event?: string;
}

export type {
	DeliveryListParams,
	DeliveryStatusDto,
	SubscriptionCreateBody,
	WebhookCreateBody,
	WebhookDeliveryDto,
	WebhookDto,
	WebhookEventTypeDto,
	WebhookListParams,
	WebhookPatchBody,
	WebhookSecretDto,
	WebhookSubscriptionDto,
};
