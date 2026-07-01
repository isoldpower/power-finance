import type { AxiosInstance } from "axios";

import type {
	INotificationsRESTApiClient,
	NotificationListRequest,
	NotificationListResponse,
	NotificationCountRequest,
	NotificationCountResponse,
	NotificationAckRequest,
	NotificationAckResponse,
} from "../types.ts";


class NotificationsDjangoRESTApiClient implements INotificationsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;

	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}

	public list(request: NotificationListRequest): Promise<NotificationListResponse> {
		const params = new URLSearchParams();
		if (request.params?.ack !== undefined) params.set('ack', String(request.params.ack));
		if (request.params?.limit) params.set('limit', String(request.params.limit));

		return this.axiosInstance.get<NotificationListResponse>(`/?${params.toString()}`)
			.then((response) => response.data);
	}

	public count(request: NotificationCountRequest): Promise<NotificationCountResponse> {
		const params = new URLSearchParams();
		if (request.params?.ack !== undefined) params.set('ack', String(request.params.ack));

		return this.axiosInstance.get<NotificationCountResponse>(`/count/?${params.toString()}`)
			.then((response) => response.data);
	}

	public ack(request: NotificationAckRequest): Promise<NotificationAckResponse> {
		return this.axiosInstance.post<NotificationAckResponse>(`/${request.id}/ack/`)
			.then((response) => response.data);
	}
}

export { NotificationsDjangoRESTApiClient };
