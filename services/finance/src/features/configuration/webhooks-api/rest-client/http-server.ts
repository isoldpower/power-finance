import { idempotencyHeaders, request, WriteVersionStore } from "@shared/api";

import type { AxiosInstance } from "axios";
import type {
	IWebhooksRESTApiClient,
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
	WebhookSearchRequest, WebhookSearchResponse,
} from "./types.ts";


class WebhooksHttpRESTApiClient implements IWebhooksRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public list(payload: WebhookListRequest): Promise<WebhookListResponse> {
		return request<WebhookListResponse>(this.axiosInstance, {
			method: 'GET',
			url: '',
			params: { ...payload.params },
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}

	public get(payload: WebhookGetRequest): Promise<WebhookGetResponse> {
		return request<WebhookGetResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/${payload.id}`,
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}

	public search(payload: WebhookSearchRequest): Promise<WebhookSearchResponse> {
		return request<WebhookSearchResponse>(this.axiosInstance, {
			method: 'POST',
			url: `/search`,
			params: { ...payload.params },
			data: payload.data,
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}

	public post(payload: WebhookPostRequest): Promise<WebhookPostResponse> {
		return request<WebhookPostResponse>(this.axiosInstance, {
			method: 'POST',
			url: '',
			data: payload.data,
			headers: idempotencyHeaders(payload.idempotencyKey),
		}, this.versions);
	}

	public patch(payload: WebhookPatchRequest): Promise<WebhookPatchResponse> {
		return request<WebhookPatchResponse>(this.axiosInstance, {
			method: 'PATCH',
			url: `/${payload.id}`,
			data: payload.data,
		}, this.versions);
	}

	public delete(payload: WebhookDeleteRequest): Promise<WebhookDeleteResponse> {
		return request<WebhookDeleteResponse>(this.axiosInstance, {
			method: 'DELETE',
			url: `/${payload.id}`,
		}, this.versions);
	}

	public rotateSecret(payload: WebhookRotateRequest): Promise<WebhookRotateResponse> {
		return request<WebhookRotateResponse>(this.axiosInstance, {
			method: 'POST',
			url: `/${payload.id}/secret`,
			headers: idempotencyHeaders(payload.idempotencyKey),
		}, this.versions);
	}

	public eventTypes(_payload: EventTypesRequest): Promise<EventTypesResponse> {
		return request<EventTypesResponse>(this.axiosInstance, {
			method: 'GET',
			url: '/event-types',
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}

	public listSubscriptions(payload: SubscriptionListRequest): Promise<SubscriptionListResponse> {
		return request<SubscriptionListResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/${payload.webhookId}/events`,
			params: { ...payload.params },
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}

	public subscribe(payload: SubscriptionPostRequest): Promise<SubscriptionPostResponse> {
		return request<SubscriptionPostResponse>(this.axiosInstance, {
			method: 'POST',
			url: `/${payload.webhookId}/events`,
			data: payload.data,
			headers: idempotencyHeaders(payload.idempotencyKey),
		}, this.versions);
	}

	public unsubscribe(payload: SubscriptionDeleteRequest): Promise<SubscriptionDeleteResponse> {
		return request<SubscriptionDeleteResponse>(this.axiosInstance, {
			method: 'DELETE',
			url: `/${payload.webhookId}/events/${payload.subscriptionId}`,
		}, this.versions);
	}

	public listDeliveries(payload: DeliveryListRequest): Promise<DeliveryListResponse> {
		return request<DeliveryListResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/${payload.webhookId}/deliveries`,
			params: { ...payload.params },
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}
}

export { WebhooksHttpRESTApiClient };
