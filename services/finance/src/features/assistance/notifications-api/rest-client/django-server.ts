import { buildQuery, openEventStream, request, WriteVersionStore } from "@shared/api";
import type { AxiosInstance } from "axios";
import type { Unsubscribe } from "@shared/api";
import type { NotificationAcknowledgedDto, NotificationDto } from "../types.ts";
import type {
	INotificationsRESTApiClient,
	NotificationAckRequest, NotificationAckResponse,
	NotificationCountRequest, NotificationCountResponse,
	NotificationListRequest, NotificationListResponse,
	NotificationStreamRequest,
} from "./types.ts";

const CREATED_EVENT = 'notification.created';
const ACKNOWLEDGED_EVENT = 'notification.acknowledged';

class NotificationsDjangoRESTApiClient implements INotificationsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public list(payload: NotificationListRequest): Promise<NotificationListResponse> {
		return request<NotificationListResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/${buildQuery({ ...payload.params })}`,
			headers: this.versions.headers(),
		}, this.versions);
	}

	public count(_payload: NotificationCountRequest): Promise<NotificationCountResponse> {
		return request<NotificationCountResponse>(this.axiosInstance, {
			method: 'GET',
			url: '/count/',
			headers: this.versions.headers(),
		}, this.versions);
	}

	public ack(payload: NotificationAckRequest): Promise<NotificationAckResponse> {
		return request<NotificationAckResponse>(this.axiosInstance, {
			method: 'POST',
			url: `/${payload.id}/ack/`,
		}, this.versions);
	}

	public stream(payload: NotificationStreamRequest): Unsubscribe {
		return openEventStream({
			url: `${this.axiosInstance.defaults.baseURL ?? ''}/stream/`,
			lastEventId: payload.lastEventId,
		}, {
			onMessage: (message) => {
				if (message.event === CREATED_EVENT) {
					payload.onCreated(JSON.parse(message.data) as NotificationDto);

					return;
				}

				if (message.event === ACKNOWLEDGED_EVENT) {
					payload.onAcknowledged(JSON.parse(message.data) as NotificationAcknowledgedDto);
				}
			},
			onError: payload.onError,
		});
	}
}

export { NotificationsDjangoRESTApiClient };
