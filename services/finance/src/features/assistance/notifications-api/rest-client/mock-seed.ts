import type { NotificationDto } from "../types.ts";

const NOTIFICATIONS_STORAGE_KEY = 'notifications-v1';

type StoredNotification = NotificationDto;

const SEED_NOTIFICATIONS: Omit<StoredNotification, 'id' | 'created_at'>[] = [
	{
		updated_at: null,
		deleted_at: null,
		severity: 'critical',
		title: 'Visa Credit near limit',
		body: 'You are at 82% of your 2,000.00 USD limit.',
		subject: null,
		acknowledged_at: null,
	},
	{
		updated_at: null,
		deleted_at: null,
		severity: 'warning',
		title: 'Groceries budget 80% spent',
		body: '320.00 USD of 400.00 USD spent this month.',
		subject: null,
		acknowledged_at: null,
	},
	{
		updated_at: null,
		deleted_at: null,
		severity: 'info',
		title: 'Transfer completed',
		body: '500.00 USD moved from Main Checking to Emergency Fund.',
		subject: null,
		acknowledged_at: null,
	},
	{
		updated_at: null,
		deleted_at: null,
		severity: 'info',
		title: 'Salary received',
		body: '4,200.00 USD deposited to Main Checking.',
		subject: null,
		acknowledged_at: new Date().toISOString(),
	},
];

export { NOTIFICATIONS_STORAGE_KEY, SEED_NOTIFICATIONS };
export type { StoredNotification };
