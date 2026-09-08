import { notificationFromApi } from "../mutators";

import type { ApiError, Unsubscribe } from "@shared/api";
import type { Notification } from "@entity/assistance";
import type { INotificationsRESTApiClient } from "../rest-client";


interface SubscribeNotificationsRequest {
	handler: Pick<INotificationsRESTApiClient, 'stream'>;
	onCreated: (notification: Notification) => void;
	onAcknowledged: (id: string, acknowledgedAt: string) => void;
	onReconnect?: () => void;
	onError?: (error: ApiError) => void;
}

function subscribeNotifications(request: SubscribeNotificationsRequest): Unsubscribe {
	return request.handler.stream({
		onCreated: (dto) => { 
			request.onCreated(notificationFromApi(dto));
		},
		onAcknowledged: (dto) => { 
			request.onAcknowledged(dto.id, dto.acknowledged_at);
		},
		onReconnect: request.onReconnect,
		onError: request.onError,
	});
}

export { subscribeNotifications };
export type { SubscribeNotificationsRequest };
