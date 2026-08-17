import { v4 as uuidv4 } from "uuid";

import { LocalStorageMock } from "@internal/shared";
import { ApiError, delay, IdempotencyStore, paginate, stringifySortedQuery, unpaginated } from "@shared/api";
import {
	DELIVERIES_STORAGE_KEY,
	EVENT_TYPES,
	SEED_WEBHOOKS,
	SUBSCRIPTIONS_STORAGE_KEY,
	WEBHOOKS_STORAGE_KEY,
} from "./storage.ts";
import type { IStorage } from "@internal/shared";
import type { StoredDelivery, StoredSubscription, StoredWebhook } from "./storage.ts";
import type { WebhookDto, WebhookSecretDto, WebhookSubscriptionDto } from "../types.ts";
import type {
	IWebhookRESTApiClient,
	DeliveryListRequest, DeliveryListResponse,
	EventTypesRequest, EventTypesResponse,
	SubscriptionDeleteRequest, SubscriptionDeleteResponse,
	SubscriptionListRequest, SubscriptionListResponse,
	SubscriptionPostRequest, SubscriptionPostResponse,
	WebhookDeleteRequest, WebhookDeleteResponse,
	WebhookGetRequest, WebhookGetResponse,
	WebhookListRequest, WebhookListResponse,
	WebhookPatchRequest, WebhookPatchResponse,
	WebhookPostRequest, WebhookPostResponse,
	WebhookRotateRequest, WebhookRotateResponse,
} from "./types.ts";

const SECRET_BYTES = 24;
const ABSOLUTE_URL = /^https?:\/\/.+/;

const buildSecret = (): string => {
	const bytes = new Uint8Array(SECRET_BYTES);
	crypto.getRandomValues(bytes);

	return `whsec_${Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')}`;
};

const compareDesc = (left: string, right: string): number => (left < right ? 1 : left > right ? -1 : 0);

const orderByCreation = <TRecord extends { id: string; created_at: string }>(records: TRecord[]): TRecord[] => {
	return [...records].sort((left, right) => {
		const byDate = compareDesc(left.created_at, right.created_at);

		return byDate !== 0 ? byDate : compareDesc(left.id, right.id);
	});
};

const assertUrl = (url: string): void => {
	if (!ABSOLUTE_URL.test(url)) {
		throw new ApiError('validation_failed', 'Webhook url must be absolute http or https', [
			{ field: 'url', code: 'url_scheme', message: 'Use an absolute http or https url' },
		]);
	}
};

const assertEventType = (event: string): void => {
	if (!EVENT_TYPES.some((type) => type.event === event)) {
		throw new ApiError('validation_failed', `${event} is not a published event type`, [
			{ field: 'event', code: 'unknown_event_type', message: 'Event is not present in the catalog' },
		]);
	}
};

const withoutSecret = (webhook: StoredWebhook): WebhookDto => ({
	id: webhook.id,
	created_at: webhook.created_at,
	updated_at: webhook.updated_at,
	title: webhook.title,
	url: webhook.url,
	enabled: webhook.enabled,
});

class WebhookMockRESTApiClient implements IWebhookRESTApiClient {
	private readonly storage: IStorage<StoredWebhook>;
	private readonly subscriptions: IStorage<StoredSubscription>;
	private readonly deliveries: IStorage<StoredDelivery>;
	private readonly idempotency = new IdempotencyStore<WebhookSecretDto>();
	private readonly subscriptionKeys = new IdempotencyStore<WebhookSubscriptionDto>();

	constructor(
		storageKey: string = WEBHOOKS_STORAGE_KEY,
		subscriptionsKey: string = SUBSCRIPTIONS_STORAGE_KEY,
		deliveriesKey: string = DELIVERIES_STORAGE_KEY,
	) {
		this.storage = new LocalStorageMock<StoredWebhook>(storageKey);
		this.subscriptions = new LocalStorageMock<StoredSubscription>(subscriptionsKey);
		this.deliveries = new LocalStorageMock<StoredDelivery>(deliveriesKey);
		this.seed();
	}

	private seed(): void {
		if (this.storage.list().length > 0) return;

		const now = Date.now();

		SEED_WEBHOOKS.forEach((webhook, index) => {
			const createdAt = new Date(now - index * 60 * 60 * 1000).toISOString();

			this.storage.add({
				...webhook,
				id: uuidv4(),
				created_at: createdAt,
				updated_at: null,
				secret: buildSecret(),
			});
		});
	}

	private require(id: string): StoredWebhook {
		const webhook = this.storage.get(id);
		if (!webhook) throw new ApiError('not_found', `Webhook ${id} does not exist`);

		return webhook;
	}

	private replace(previous: StoredWebhook, next: StoredWebhook): void {
		this.storage.remove(previous);
		this.storage.add(next);
	}

	public async list(payload: WebhookListRequest): Promise<WebhookListResponse> {
		await delay();

		const enabled = payload.params?.enabled;
		const matching = this.storage.list().filter((webhook) => enabled === undefined || webhook.enabled === enabled);
		const page = paginate(
			orderByCreation(matching),
			payload.params,
			stringifySortedQuery({ enabled: enabled ?? null }),
		);

		return { data: page.items.map(withoutSecret), meta: { ...page.meta, cached: false } };
	}

	public async get(payload: WebhookGetRequest): Promise<WebhookGetResponse> {
		await delay();

		return { data: withoutSecret(this.require(payload.id)), meta: { cached: false } };
	}

	public async post(payload: WebhookPostRequest): Promise<WebhookPostResponse> {
		const replay = this.idempotency.replay(payload.idempotencyKey, payload.data);
		if (replay) return { data: replay, meta: { idempotent_replay: true } };

		assertUrl(payload.data.url);

		await delay();

		const webhook: StoredWebhook = {
			id: uuidv4(),
			created_at: new Date().toISOString(),
			updated_at: null,
			title: payload.data.title,
			url: payload.data.url,
			enabled: payload.data.enabled ?? true,
			secret: buildSecret(),
		};

		this.storage.add(webhook);
		this.idempotency.remember(payload.idempotencyKey, payload.data, webhook);

		return { data: webhook, meta: { idempotent_replay: false } };
	}

	public async patch(payload: WebhookPatchRequest): Promise<WebhookPatchResponse> {
		if (payload.data.url !== undefined) assertUrl(payload.data.url);

		await delay();

		const webhook = this.require(payload.id);
		const updated: StoredWebhook = {
			...webhook,
			title: payload.data.title ?? webhook.title,
			url: payload.data.url ?? webhook.url,
			enabled: payload.data.enabled ?? webhook.enabled,
			updated_at: new Date().toISOString(),
		};

		this.replace(webhook, updated);

		return { data: withoutSecret(updated), meta: {} };
	}

	public async delete(payload: WebhookDeleteRequest): Promise<WebhookDeleteResponse> {
		await delay();

		const webhook = this.require(payload.id);

		for (const subscription of this.subscriptions.list()) {
			if (subscription.webhook_id === webhook.id) this.subscriptions.remove(subscription);
		}

		this.storage.remove(webhook);

		return { data: withoutSecret(webhook), meta: {} };
	}

	public async rotateSecret(payload: WebhookRotateRequest): Promise<WebhookRotateResponse> {
		await delay();

		const webhook = this.require(payload.id);
		const rotated: StoredWebhook = {
			...webhook,
			secret: buildSecret(),
			updated_at: new Date().toISOString(),
		};

		this.replace(webhook, rotated);

		return { data: rotated, meta: { idempotent_replay: false } };
	}

	public async eventTypes(_payload: EventTypesRequest): Promise<EventTypesResponse> {
		await delay();

		const page = unpaginated(EVENT_TYPES);

		return { data: page.items, meta: { ...page.meta, cached: false } };
	}

	public async listSubscriptions(payload: SubscriptionListRequest): Promise<SubscriptionListResponse> {
		await delay();

		this.require(payload.webhookId);

		const matching = this.subscriptions.list()
			.filter((subscription) => subscription.webhook_id === payload.webhookId);
		const page = paginate(
			orderByCreation(matching),
			payload.params,
			stringifySortedQuery({ webhook: payload.webhookId }),
		);

		return { data: page.items, meta: { ...page.meta, cached: false } };
	}

	public async subscribe(payload: SubscriptionPostRequest): Promise<SubscriptionPostResponse> {
		const replay = this.subscriptionKeys.replay(payload.idempotencyKey, payload.data);
		if (replay) return { data: replay, meta: { idempotent_replay: true } };

		this.require(payload.webhookId);
		assertEventType(payload.data.event);

		const existing = this.subscriptions.list().some((subscription) => {
			return subscription.webhook_id === payload.webhookId && subscription.event === payload.data.event;
		});

		if (existing) {
			throw new ApiError('subscription_exists', `Endpoint already subscribes to ${payload.data.event}`);
		}

		await delay();

		const subscription: StoredSubscription = {
			id: uuidv4(),
			created_at: new Date().toISOString(),
			webhook_id: payload.webhookId,
			event: payload.data.event,
		};

		this.subscriptions.add(subscription);
		this.subscriptionKeys.remember(payload.idempotencyKey, payload.data, subscription);

		return { data: subscription, meta: { idempotent_replay: false } };
	}

	public async unsubscribe(payload: SubscriptionDeleteRequest): Promise<SubscriptionDeleteResponse> {
		await delay();

		const subscription = this.subscriptions.get(payload.subscriptionId);

		if (!subscription || subscription.webhook_id !== payload.webhookId) {
			throw new ApiError('not_found', `Subscription ${payload.subscriptionId} does not exist`);
		}

		this.subscriptions.remove(subscription);

		return { data: subscription, meta: {} };
	}

	public async listDeliveries(payload: DeliveryListRequest): Promise<DeliveryListResponse> {
		await delay();

		this.require(payload.webhookId);

		const status = payload.params?.status;
		const event = payload.params?.event;
		const matching = this.deliveries.list().filter((delivery) => {
			if (delivery.webhook_id !== payload.webhookId) return false;
			if (status && delivery.status !== status) return false;
			if (event && delivery.event !== event) return false;

			return true;
		});

		const page = paginate(
			orderByCreation(matching),
			payload.params,
			stringifySortedQuery({ webhook: payload.webhookId, status: status ?? null, event: event ?? null }),
		);

		return { data: page.items, meta: { ...page.meta, cached: false } };
	}
}

export { WebhookMockRESTApiClient };
