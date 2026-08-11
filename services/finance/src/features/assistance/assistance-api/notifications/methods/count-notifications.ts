import type { INotificationsRESTApiClient, NotificationCountResponse } from "../types.ts";


interface CountNotificationsRequest {
	handler: Pick<INotificationsRESTApiClient, 'count'>;
	ack?: boolean;
}

async function countNotifications(request: CountNotificationsRequest): Promise<NotificationCountResponse> {
	return request.handler.count({ params: { ack: request.ack ?? false } });
}

export { countNotifications };
export type { CountNotificationsRequest };
