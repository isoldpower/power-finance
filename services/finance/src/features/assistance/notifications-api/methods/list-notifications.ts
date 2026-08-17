import { pageFromMeta } from "@shared/api";
import { notificationFromApi, notificationQueryToApi } from "../mutators";
import type { Page, PageParams } from "@shared/api";
import type { Notification, NotificationQuery } from "@entity/assistance";
import type { INotificationsRESTApiClient } from "../rest-client";

interface ListNotificationsRequest {
	handler: Pick<INotificationsRESTApiClient, 'list'>;
	query?: NotificationQuery;
	page?: PageParams;
}

interface ListNotificationsResponse {
	page: Page<Notification>;
}

async function listNotifications(request: ListNotificationsRequest): Promise<ListNotificationsResponse> {
	const response = await request.handler.list({
		params: { ...notificationQueryToApi(request.query), ...request.page },
	});

	return { page: pageFromMeta(response.data.map(notificationFromApi), response.meta) };
}

export { listNotifications };
export type { ListNotificationsRequest, ListNotificationsResponse };
