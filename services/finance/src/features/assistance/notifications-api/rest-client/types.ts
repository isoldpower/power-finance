import type { ApiError, CollectionResponse, MutationResponse, ResourceResponse, Unsubscribe } from "@shared/api";
import type {
	NotificationAckBatchBody,
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

interface NotificationAckBatchRequest {
	data: NotificationAckBatchBody;
}

type NotificationAckBatchResponse = CollectionResponse<NotificationDto>;

interface NotificationDeleteRequest {
	id: string;
}

type NotificationDeleteResponse = MutationResponse<NotificationDto>;

interface NotificationStreamRequest {
	onCreated: (notification: NotificationDto) => void;
	onAcknowledged: (acknowledged: NotificationAcknowledgedDto) => void;
	onReconnect?: () => void;
	onError?: (error: ApiError) => void;
}

interface INotificationsRESTApiClient {
	list: (request: NotificationListRequest) => Promise<NotificationListResponse>;
	count: (request: NotificationCountRequest) => Promise<NotificationCountResponse>;
	ack: (request: NotificationAckRequest) => Promise<NotificationAckResponse>;
	ackBatch: (request: NotificationAckBatchRequest) => Promise<NotificationAckBatchResponse>;
	delete: (request: NotificationDeleteRequest) => Promise<NotificationDeleteResponse>;
	stream: (request: NotificationStreamRequest) => Unsubscribe;
}

export type {
	INotificationsRESTApiClient,
	NotificationAckBatchRequest,
	NotificationAckBatchResponse,
	NotificationAckRequest,
	NotificationAckResponse,
	NotificationDeleteRequest,
	NotificationDeleteResponse,
	NotificationCountRequest,
	NotificationCountResponse,
	NotificationListRequest,
	NotificationListResponse,
	NotificationStreamRequest,
};
