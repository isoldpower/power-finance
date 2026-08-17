import { notificationFromApi } from "../mutators";

import type { ApiError, Unsubscribe } from "@shared/api";
import type { Notification } from "@entity/assistance";
import type { INotificationsRESTApiClient } from "../rest-client";


interface SubscribeNotificationsRequest {
	handler: Pick<INotificationsRESTApiClient, 'stream'>;
	lastEventId?: string | null;
	onCreated: (notification: Notification) => void;
	onAcknowledged: (id: string, acknowledgedAt: string) => void;
	onError?: (error: ApiError) => void;
}

function subscribeNotifications(request: SubscribeNotificationsRequest): Unsubscribe {
	return request.handler.stream({
		lastEventId: request.lastEventId,
		onCreated: (dto) => { 
			request.onCreated(notificationFromApi(dto));
		},
		onAcknowledged: (dto) => { 
			request.onAcknowledged(dto.id, dto.acknowledged_at);
		},
		onError: request.onError,
	});
}

export { subscribeNotifications };
export type { SubscribeNotificationsRequest };
