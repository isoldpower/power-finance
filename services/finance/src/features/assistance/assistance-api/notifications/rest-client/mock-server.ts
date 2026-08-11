import type {
	INotificationsRESTApiClient,
	Notification,
	NotificationListRequest,
	NotificationListResponse,
	NotificationCountRequest,
	NotificationCountResponse,
	NotificationAckRequest,
	NotificationAckResponse,
} from "../types.ts";

const MOCK_DELAY_MS = 250;
const STORAGE_KEY = 'mock:notifications';

const delay = <T>(value: T): Promise<T> =>
	new Promise((resolve) => setTimeout(() => { resolve(value); }, MOCK_DELAY_MS));

const SEED: Notification[] = [
	{ id: 'n1', level: 'alert', title: 'Visa Credit near limit', body: 'You are at 82% of your $2,000 limit.', time: '8m', ack: false },
	{ id: 'n2', level: 'warning', title: 'Groceries budget 80%', body: '$320 of $400 spent this month.', time: '1h', ack: false },
	{ id: 'n3', level: 'info', title: 'Transfer completed', body: '$500.00 Main Checking → Emergency Fund.', time: '1h', ack: false },
	{ id: 'n4', level: 'info', title: 'Salary received', body: '+$4,200.00 deposited to Main Checking.', time: 'Yesterday', ack: true },
];

const loadNotifications = (): Notification[] => {
	if (typeof window === 'undefined') return SEED.map((notification) => ({ ...notification }));
	try {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (stored === null) return SEED.map((notification) => ({ ...notification }));
		return JSON.parse(stored) as Notification[];
	} catch {
		return SEED.map((notification) => ({ ...notification }));
	}
};

const saveNotifications = (notifications: Notification[]): void => {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
	} catch {
		// Ignore storage failures (private mode, quota) — falls back to in-memory only.
	}
};


class NotificationsMockRESTApiClient implements INotificationsRESTApiClient {
	private notifications: Notification[] = loadNotifications();

	public list(request: NotificationListRequest): Promise<NotificationListResponse> {
		const filtered = request.params?.ack === undefined
			? this.notifications
			: this.notifications.filter((notification) => notification.ack === request.params?.ack);
		const limit = request.params?.limit ?? filtered.length;
		const data = filtered.slice(0, limit);

		return delay({
			data,
			meta: { total: filtered.length, offset: 0, limit: data.length },
		});
	}

	public count(request: NotificationCountRequest): Promise<NotificationCountResponse> {
		const ack = request.params?.ack ?? false;
		const count = this.notifications.filter((notification) => notification.ack === ack).length;

		return delay({ count });
	}

	public ack(request: NotificationAckRequest): Promise<NotificationAckResponse> {
		this.notifications = this.notifications.map((notification) =>
			notification.id === request.id ? { ...notification, ack: request.ack } : notification
		);
		saveNotifications(this.notifications);

		return delay({
			message: `Notification ${request.id} marked as ${request.ack ? 'seen' : 'unseen'}`,
			meta: { id: request.id, success: true },
		});
	}
}

export { NotificationsMockRESTApiClient };
