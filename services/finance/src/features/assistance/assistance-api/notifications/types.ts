import type {
	IListHandler,
	ListRequest,
	ListResponse,
	DeleteResponse,
} from "@internal/shared";

type NotificationLevel = 'alert' | 'warning' | 'info';

interface Notification {
	id: string;
	level: NotificationLevel;
	title: string;
	body: string;
	time: string;
	ack: boolean;
}

interface NotificationListParams {
	ack?: boolean;
	limit?: number;
}

type NotificationListRequest = ListRequest<NotificationListParams>;
type NotificationListResponse = ListResponse<Notification>;

interface NotificationCountRequest {
	params?: { ack?: boolean };
}

interface NotificationCountResponse {
	count: number;
}

interface NotificationAckRequest {
	id: string;
	ack: boolean;
}

type NotificationAckResponse = DeleteResponse;

interface INotificationsRESTApiClient extends IListHandler<Notification, NotificationListParams> {
	count: (request: NotificationCountRequest) => Promise<NotificationCountResponse>;
	ack: (request: NotificationAckRequest) => Promise<NotificationAckResponse>;
}

export type {
	NotificationLevel,
	Notification,
	NotificationListParams,
	NotificationListRequest,
	NotificationListResponse,
	NotificationCountRequest,
	NotificationCountResponse,
	NotificationAckRequest,
	NotificationAckResponse,
	INotificationsRESTApiClient,
};
