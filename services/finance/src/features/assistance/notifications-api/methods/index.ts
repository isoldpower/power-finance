import type {
	INotificationsRESTApiClient,
	Notification,
	NotificationCountResponse,
	NotificationAckResponse,
} from "../types.ts";

interface ListNotificationsRequest {
	handler: Pick<INotificationsRESTApiClient, 'list'>;
	ack?: boolean;
	limit?: number;
}

interface ListNotificationsResponse {
	data: Notification[];
	meta: { limit: number; offset: number; total: number };
}

async function listNotifications(request: ListNotificationsRequest): Promise<ListNotificationsResponse> {
	return request.handler.list({ params: { ack: request.ack, limit: request.limit } });
}

interface CountNotificationsRequest {
	handler: Pick<INotificationsRESTApiClient, 'count'>;
	ack?: boolean;
}

async function countNotifications(request: CountNotificationsRequest): Promise<NotificationCountResponse> {
	return request.handler.count({ params: { ack: request.ack ?? false } });
}

interface AckNotificationRequest {
	handler: Pick<INotificationsRESTApiClient, 'ack'>;
	id: string;
}

async function ackNotification(request: AckNotificationRequest): Promise<NotificationAckResponse> {
	return request.handler.ack({ id: request.id });
}

export { listNotifications, countNotifications, ackNotification };
export type {
	ListNotificationsRequest,
	ListNotificationsResponse,
	CountNotificationsRequest,
	AckNotificationRequest,
};
