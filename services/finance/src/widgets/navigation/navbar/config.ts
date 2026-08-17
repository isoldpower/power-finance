import type { Severity } from "@entity/assistance";

type NotificationLevel = 'alert' | 'warning' | 'info';

const NOTIFICATION_LEVEL: Record<Severity, NotificationLevel> = {
	critical: 'alert',
	warning: 'warning',
	info: 'info',
};

const NOTIFICATIONS_PAGE_SIZE = 8;

export { NOTIFICATION_LEVEL, NOTIFICATIONS_PAGE_SIZE };
export type { NotificationLevel };
