export { NotificationsDjangoRESTApiClient } from './django-server.ts';
export { NotificationsMockRESTApiClient } from './mock-server.ts';
export { NOTIFICATIONS_STORAGE_KEY } from './mock-seed.ts';

export type {
	INotificationsRESTApiClient,
	NotificationAckRequest,
	NotificationAckResponse,
	NotificationCountRequest,
	NotificationCountResponse,
	NotificationListRequest,
	NotificationListResponse,
	NotificationStreamRequest,
} from './types.ts';
export type { StoredNotification } from './mock-seed.ts';
