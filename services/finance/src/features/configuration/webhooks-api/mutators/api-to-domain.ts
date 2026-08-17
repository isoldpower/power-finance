import type {
	WebhookDelivery,
	WebhookEndpoint,
	WebhookEndpointSecret,
	WebhookEventType,
	WebhookSubscription,
} from "@entity/configuration";
import type {
	WebhookDeliveryDto,
	WebhookDto,
	WebhookEventTypeDto,
	WebhookSecretDto,
	WebhookSubscriptionDto,
} from "../types.ts";

const webhookFromApi = (dto: WebhookDto): WebhookEndpoint => ({
	id: dto.id,
	createdAt: dto.created_at,
	updatedAt: dto.updated_at,
	title: dto.title,
	url: dto.url,
	enabled: dto.enabled,
});

const webhookSecretFromApi = (dto: WebhookSecretDto): WebhookEndpointSecret => ({
	...webhookFromApi(dto),
	secret: dto.secret,
});

const eventTypeFromApi = (dto: WebhookEventTypeDto): WebhookEventType => ({
	event: dto.event,
	subject: dto.subject,
	description: dto.description,
});

const subscriptionFromApi = (dto: WebhookSubscriptionDto): WebhookSubscription => ({
	id: dto.id,
	createdAt: dto.created_at,
	webhookId: dto.webhook_id,
	event: dto.event,
});

const deliveryFromApi = (dto: WebhookDeliveryDto): WebhookDelivery => ({
	id: dto.id,
	createdAt: dto.created_at,
	updatedAt: dto.updated_at,
	webhookId: dto.webhook_id,
	eventId: dto.event_id,
	event: dto.event,
	targetUrl: dto.target_url,
	status: dto.status,
	attempts: dto.attempts,
	nextAttemptAt: dto.next_attempt_at,
	lastError: dto.last_error,
});

export { deliveryFromApi, eventTypeFromApi, subscriptionFromApi, webhookFromApi, webhookSecretFromApi };
