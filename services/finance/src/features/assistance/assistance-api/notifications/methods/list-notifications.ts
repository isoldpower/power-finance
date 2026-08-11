import type { INotificationsRESTApiClient, Notification } from "../types.ts";


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

export { listNotifications };
export type { ListNotificationsRequest, ListNotificationsResponse };
