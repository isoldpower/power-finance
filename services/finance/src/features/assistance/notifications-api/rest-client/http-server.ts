import { openEventStream, request, WriteVersionStore } from "@internal/shared";
import type { TokenSource, Unsubscribe } from "@internal/shared";
import type { AxiosInstance } from "axios";
import type { NotificationAcknowledgedDto, NotificationDto } from "../types.ts";
import type {
	INotificationsRESTApiClient,
	NotificationAckBatchRequest, NotificationAckBatchResponse,
	NotificationAckRequest, NotificationAckResponse,
	NotificationCountRequest, NotificationCountResponse,
	NotificationDeleteRequest, NotificationDeleteResponse,
	NotificationListRequest, NotificationListResponse,
	NotificationStreamRequest,
} from "./types.ts";

const CREATED_EVENT = 'notification.created';
const ACKNOWLEDGED_EVENT = 'notification.acknowledged';

class NotificationsHttpRESTApiClient implements INotificationsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;
	private readonly authorize: TokenSource | undefined;
	private readonly streamHeaders: Record<string, string>;

	constructor(
		axiosInstance: AxiosInstance,
		versions = new WriteVersionStore(),
		authorize?: TokenSource,
		streamHeaders: Record<string, string> = {},
	) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
		this.authorize = authorize;
		this.streamHeaders = streamHeaders;
	}

	public list(payload: NotificationListRequest): Promise<NotificationListResponse> {
		return request<NotificationListResponse>(this.axiosInstance, {
			method: 'GET',
			url: '',
			params: { ...payload.params },
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}

	public count(_payload: NotificationCountRequest): Promise<NotificationCountResponse> {
		return request<NotificationCountResponse>(this.axiosInstance, {
			method: 'GET',
			url: '/count',
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}

	public ack(payload: NotificationAckRequest): Promise<NotificationAckResponse> {
		return request<NotificationAckResponse>(this.axiosInstance, {
			method: 'POST',
			url: `/${payload.id}/ack`,
		}, this.versions);
	}

	public ackBatch(payload: NotificationAckBatchRequest): Promise<NotificationAckBatchResponse> {
		return request<NotificationAckBatchResponse>(this.axiosInstance, {
			method: 'POST',
			url: '/ack',
			data: payload.data,
		}, this.versions);
	}

	public delete(payload: NotificationDeleteRequest): Promise<NotificationDeleteResponse> {
		return request<NotificationDeleteResponse>(this.axiosInstance, {
			method: 'DELETE',
			url: `/${payload.id}`,
		}, this.versions);
	}

	public stream(payload: NotificationStreamRequest): Unsubscribe {
		return openEventStream({
			url: `${this.axiosInstance.defaults.baseURL ?? ''}/stream`,
			authorize: this.authorize,
			headers: this.streamHeaders,
		}, {
			onMessage: (message) => {
				if (message.event === CREATED_EVENT) {
					payload.onCreated(
						JSON.parse(message.data) as NotificationDto
					);

					return;
				}

				if (message.event === ACKNOWLEDGED_EVENT) {
					payload.onAcknowledged(
						JSON.parse(message.data) as NotificationAcknowledgedDto
					);
				}
			},
			onError: payload.onError,
			onReconnect: payload.onReconnect,
		});
	}
}

export { NotificationsHttpRESTApiClient };
