import type { INotificationsRESTApiClient, NotificationAckResponse } from "../types.ts";


interface AckNotificationRequest {
	handler: Pick<INotificationsRESTApiClient, 'ack'>;
	id: string;
}

async function ackNotification(request: AckNotificationRequest): Promise<NotificationAckResponse> {
	return request.handler.ack({ id: request.id });
}

export { ackNotification };
export type { AckNotificationRequest };
