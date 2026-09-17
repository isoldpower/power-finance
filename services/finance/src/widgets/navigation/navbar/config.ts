import type { Severity } from "@entity/assistance";

type NotificationLevel = 'alert' | 'warning' | 'info';

const NOTIFICATION_LEVEL: Record<Severity, NotificationLevel> = {
	critical: 'alert',
	warning: 'warning',
	info: 'info',
};

const NOTIFICATIONS_PAGE_SIZE = 8;

const TRIGGER_DISMISS_WINDOW = 250;

export { NOTIFICATION_LEVEL, NOTIFICATIONS_PAGE_SIZE, TRIGGER_DISMISS_WINDOW };
export type { NotificationLevel };
