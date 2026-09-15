import { NOTIFICATIONS_CACHE_KEYS } from "../../cache-config.ts";

import type { QueryKey } from "@tanstack/react-query";
import type { OptimisticResource } from "@shared/data";
import type { Notification } from "@entity/assistance";


const ANY = 'any';

const matchesAcknowledged = (segment: unknown, notification: Notification): boolean => (
	typeof segment !== 'boolean' || segment === (notification.acknowledgedAt !== null)
);

const matchesSeverity = (segment: unknown, notification: Notification): boolean => (
	segment === ANY || segment === notification.severity
);

const accepts = (key: QueryKey, notification: Notification): boolean => {
	const [, acknowledged, severity] = key;

	return matchesAcknowledged(acknowledged, notification)
		&& matchesSeverity(severity, notification);
};

const NOTIFICATION_RESOURCE: OptimisticResource<Notification, never, never> = {
	paged: [{ key: NOTIFICATIONS_CACHE_KEYS.list, accepts }],
	singles: [NOTIFICATIONS_CACHE_KEYS.count],
};

export { NOTIFICATION_RESOURCE };
