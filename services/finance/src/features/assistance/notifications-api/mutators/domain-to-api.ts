import type { NotificationQuery } from "@entity/assistance";
import type { NotificationListParams } from "../types.ts";

const notificationQueryToApi = (query: NotificationQuery | undefined): NotificationListParams => ({
	...(query?.acknowledged === undefined ? {} : { acknowledged: query.acknowledged }),
	...(query?.severity === undefined ? {} : { severity: query.severity }),
});

export { notificationQueryToApi };
