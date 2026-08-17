import { notificationCountsFromApi } from "../mutators";

import type { NotificationCounts } from "@entity/assistance";
import type { INotificationsRESTApiClient } from "../rest-client";


interface CountNotificationsRequest {
	handler: Pick<INotificationsRESTApiClient, 'count'>;
}

type CountNotificationsResponse = NotificationCounts;

async function countNotifications(request: CountNotificationsRequest): Promise<CountNotificationsResponse> {
	const response = await request.handler.count({});

	return notificationCountsFromApi(response.data);
}

export { countNotifications };
export type { CountNotificationsRequest, CountNotificationsResponse };
