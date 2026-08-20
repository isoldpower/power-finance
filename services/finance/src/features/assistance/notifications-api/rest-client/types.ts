import type { ApiError, CollectionResponse, MutationResponse, ResourceResponse, Unsubscribe } from "@shared/api";
import type {
	NotificationAcknowledgedDto,
	NotificationCountsDto,
	NotificationDto,
	NotificationListParams,
} from "../types.ts";


interface NotificationListRequest {
	params?: NotificationListParams;
}

type NotificationListResponse = CollectionResponse<NotificationDto>;

interface NotificationCountRequest {
	params?: object;
}

type NotificationCountResponse = ResourceResponse<NotificationCountsDto>;

interface NotificationAckRequest {
	id: string;
}

type NotificationAckResponse = MutationResponse<NotificationDto>;

interface NotificationStreamRequest {
	lastEventId?: string | null;
	onCreated: (notification: NotificationDto) => void;
	onAcknowledged: (acknowledged: NotificationAcknowledgedDto) => void;
	onError?: (error: ApiError) => void;
}

interface INotificationsRESTApiClient {
	list: (request: NotificationListRequest) => Promise<NotificationListResponse>;
	count: (request: NotificationCountRequest) => Promise<NotificationCountResponse>;
	ack: (request: NotificationAckRequest) => Promise<NotificationAckResponse>;
	stream: (request: NotificationStreamRequest) => Unsubscribe;
}

export type {
	INotificationsRESTApiClient,
	NotificationAckRequest,
	NotificationAckResponse,
	NotificationCountRequest,
	NotificationCountResponse,
	NotificationListRequest,
	NotificationListResponse,
	NotificationStreamRequest,
};
