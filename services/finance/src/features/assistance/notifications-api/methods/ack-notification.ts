import { notificationFromApi } from "../mutators";
import type { Notification } from "@entity/assistance";
import type { INotificationsRESTApiClient } from "../rest-client";

interface AckNotificationRequest {
	handler: Pick<INotificationsRESTApiClient, 'ack'>;
	id: string;
}

type AckNotificationResponse = Notification;

async function ackNotification(request: AckNotificationRequest): Promise<AckNotificationResponse> {
	const response = await request.handler.ack({ id: request.id });

	return notificationFromApi(response.data);
}

export { ackNotification };
export type { AckNotificationRequest, AckNotificationResponse };
