import { v4 as uuidv4 } from "uuid";
import { LocalStorageMock } from "@internal/shared";
import { ApiError, delay, paginate, stringifySortedQuery } from "@shared/api";
import { NOTIFICATIONS_STORAGE_KEY, SEED_NOTIFICATIONS } from "./mock-seed.ts";

import type { IStorage } from "@internal/shared";
import type { Unsubscribe } from "@shared/api";
import type { StoredNotification } from "./mock-seed.ts";
import type {
	INotificationsRESTApiClient,
	NotificationAckRequest, NotificationAckResponse,
	NotificationCountRequest, NotificationCountResponse,
	NotificationListRequest, NotificationListResponse,
	NotificationStreamRequest,
} from "./types.ts";


const SEED_OFFSETS_MS = [8 * 60 * 1000, 60 * 60 * 1000, 70 * 60 * 1000, 26 * 60 * 60 * 1000];

const compareDesc = (left: string, right: string): number => (left < right ? 1 : left > right ? -1 : 0);

const orderNotifications = (notifications: StoredNotification[]): StoredNotification[] => {
	return [...notifications].sort((left, right) => {
		const byDate = compareDesc(left.created_at, right.created_at);

		return byDate !== 0 ? byDate : compareDesc(left.id, right.id);
	});
};

class NotificationsMockRESTApiClient implements INotificationsRESTApiClient {
	private readonly storage: IStorage<StoredNotification>;
	private readonly listeners = new Set<NotificationStreamRequest>();

	constructor(storageKey: string = NOTIFICATIONS_STORAGE_KEY) {
		this.storage = new LocalStorageMock<StoredNotification>(storageKey);
		this.seed();
	}

	private seed(): void {
		if (this.storage.list().length > 0) return;

		const now = Date.now();

		SEED_NOTIFICATIONS.forEach((notification, index) => {
			const createdAt = new Date(now - (SEED_OFFSETS_MS[index] ?? 0)).toISOString();

			this.storage.add({ ...notification, id: uuidv4(), created_at: createdAt });
		});
	}

	private require(id: string): StoredNotification {
		const notification = this.storage.get(id);
		if (!notification) throw new ApiError('not_found', `Notification ${id} does not exist`);

		return notification;
	}

	public async list(payload: NotificationListRequest): Promise<NotificationListResponse> {
		await delay();

		const acknowledged = payload.params?.acknowledged;
		const severity = payload.params?.severity;

		const matching = this.storage.list().filter((notification) => {
			if (notification.deleted_at !== null) return false;
			if (acknowledged !== undefined && (notification.acknowledged_at !== null) !== acknowledged) return false;
			if (severity && notification.severity !== severity) return false;

			return true;
		});

		const page = paginate(
			orderNotifications(matching),
			payload.params,
			stringifySortedQuery({ acknowledged: acknowledged ?? null, severity: severity ?? null }),
		);

		return { data: page.items, meta: { ...page.meta, cached: false } };
	}

	public async count(_payload: NotificationCountRequest): Promise<NotificationCountResponse> {
		await delay();

		const notifications = this.storage.list().filter((notification) => notification.deleted_at === null);

		return {
			data: {
				unacknowledged: notifications.filter((notification) => notification.acknowledged_at === null).length,
				total: notifications.length,
			},
			meta: { cached: false },
		};
	}

	public async ack(payload: NotificationAckRequest): Promise<NotificationAckResponse> {
		await delay();

		const notification = this.require(payload.id);

		if (notification.acknowledged_at !== null) {
			return { data: notification, meta: {} };
		}

		const acknowledgedAt = new Date().toISOString();
		const acknowledged: StoredNotification = {
			...notification,
			acknowledged_at: acknowledgedAt,
			updated_at: acknowledgedAt,
		};

		this.storage.remove(notification);
		this.storage.add(acknowledged);

		for (const listener of this.listeners) {
			listener.onAcknowledged({ id: acknowledged.id, acknowledged_at: acknowledgedAt });
		}

		return { data: acknowledged, meta: {} };
	}

	public stream(payload: NotificationStreamRequest): Unsubscribe {
		this.listeners.add(payload);

		return () => { this.listeners.delete(payload); };
	}
}

export { NotificationsMockRESTApiClient };
