import type { CollectionResponse, MutationResponse, ResourceResponse } from "@shared/api";
import type {
	DeliveryListParams,
	SubscriptionCreateBody,
	WebhookCreateBody,
	WebhookDeliveryDto,
	WebhookDto,
	WebhookEventTypeDto,
	WebhookListParams,
	WebhookPatchBody,
	WebhookSearchBody,
	WebhookSearchParams,
	WebhookSecretDto,
	WebhookSubscriptionDto,
} from "../types.ts";


interface WebhookListRequest {
	params?: WebhookListParams;
}

type WebhookListResponse = CollectionResponse<WebhookDto>;

interface WebhookGetRequest {
	id: string;
}

type WebhookGetResponse = ResourceResponse<WebhookDto>;

interface WebhookSearchRequest {
	data: WebhookSearchBody;
	params?: WebhookSearchParams;
}

type WebhookSearchResponse = CollectionResponse<WebhookDto>;

interface WebhookPostRequest {
	data: WebhookCreateBody;
	idempotencyKey?: string;
}

type WebhookPostResponse = MutationResponse<WebhookSecretDto>;

interface WebhookPatchRequest {
	id: string;
	data: WebhookPatchBody;
}

type WebhookPatchResponse = MutationResponse<WebhookDto>;

interface WebhookDeleteRequest {
	id: string;
}

type WebhookDeleteResponse = MutationResponse<WebhookDto>;

interface WebhookRotateRequest {
	id: string;
	idempotencyKey?: string;
}

type WebhookRotateResponse = MutationResponse<WebhookSecretDto>;

interface EventTypesRequest {
	params?: object;
}

type EventTypesResponse = CollectionResponse<WebhookEventTypeDto>;

interface SubscriptionListRequest {
	webhookId: string;
	params?: { limit?: number; cursor?: string };
}

type SubscriptionListResponse = CollectionResponse<WebhookSubscriptionDto>;

interface SubscriptionPostRequest {
	webhookId: string;
	data: SubscriptionCreateBody;
	idempotencyKey?: string;
}

type SubscriptionPostResponse = MutationResponse<WebhookSubscriptionDto>;

interface SubscriptionDeleteRequest {
	webhookId: string;
	subscriptionId: string;
}

type SubscriptionDeleteResponse = MutationResponse<WebhookSubscriptionDto>;

interface DeliveryListRequest {
	webhookId: string;
	params?: DeliveryListParams;
}

type DeliveryListResponse = CollectionResponse<WebhookDeliveryDto>;

interface IWebhooksRESTApiClient {
	list: (request: WebhookListRequest) => Promise<WebhookListResponse>;
	get: (request: WebhookGetRequest) => Promise<WebhookGetResponse>;
	search: (request: WebhookSearchRequest) => Promise<WebhookSearchResponse>;
	post: (request: WebhookPostRequest) => Promise<WebhookPostResponse>;
	patch: (request: WebhookPatchRequest) => Promise<WebhookPatchResponse>;
	delete: (request: WebhookDeleteRequest) => Promise<WebhookDeleteResponse>;
	rotateSecret: (request: WebhookRotateRequest) => Promise<WebhookRotateResponse>;
	eventTypes: (request: EventTypesRequest) => Promise<EventTypesResponse>;
	listSubscriptions: (request: SubscriptionListRequest) => Promise<SubscriptionListResponse>;
	subscribe: (request: SubscriptionPostRequest) => Promise<SubscriptionPostResponse>;
	unsubscribe: (request: SubscriptionDeleteRequest) => Promise<SubscriptionDeleteResponse>;
	listDeliveries: (request: DeliveryListRequest) => Promise<DeliveryListResponse>;
}

export type {
	IWebhooksRESTApiClient,
	DeliveryListRequest,
	DeliveryListResponse,
	EventTypesRequest,
	EventTypesResponse,
	SubscriptionDeleteRequest,
	SubscriptionDeleteResponse,
	SubscriptionListRequest,
	SubscriptionListResponse,
	SubscriptionPostRequest,
	SubscriptionPostResponse,
	WebhookDeleteRequest,
	WebhookDeleteResponse,
	WebhookGetRequest,
	WebhookGetResponse,
	WebhookListRequest,
	WebhookListResponse,
	WebhookPatchRequest,
	WebhookPatchResponse,
	WebhookPostRequest,
	WebhookPostResponse,
	WebhookRotateRequest,
	WebhookRotateResponse,
	WebhookSearchRequest,
	WebhookSearchResponse,
};
