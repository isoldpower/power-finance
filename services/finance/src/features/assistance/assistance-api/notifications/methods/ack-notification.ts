import type { INotificationsRESTApiClient, NotificationAckResponse } from "../types.ts";


interface AckNotificationRequest {
	handler: Pick<INotificationsRESTApiClient, 'ack'>;
	id: string;
	ack: boolean;
}

async function ackNotification(request: AckNotificationRequest): Promise<NotificationAckResponse> {
	return request.handler.ack({ id: request.id, ack: request.ack });
}

export { ackNotification };
export type { AckNotificationRequest };
