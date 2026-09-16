import type { CollectionResponse, ResourceResponse } from "@shared/api";
import type {
	AssistantAcceptedDto,
	AssistantClearedDto,
	AssistantDeltaDto,
	AssistantMessageDto,
	AssistantMessagesParams,
	AssistantOverviewDto,
	AssistantQuotaDto,
	AssistantSendBody,
} from "../types.ts";


interface AssistantOverviewRequest {
	params?: object;
}

type AssistantOverviewResponse = ResourceResponse<AssistantOverviewDto>;

interface AssistantMessagesRequest {
	params?: AssistantMessagesParams;
}

type AssistantMessagesResponse = CollectionResponse<AssistantMessageDto>;

interface AssistantSendRequest {
	data: AssistantSendBody;
	idempotencyKey?: string;
	onAccepted?: (accepted: AssistantAcceptedDto) => void;
	onDelta?: (delta: AssistantDeltaDto) => void;
	signal?: AbortSignal;
}

interface AssistantSendResponse {
	message: AssistantMessageDto;
	quota: AssistantQuotaDto | null;
}

interface AssistantClearRequest {
	params?: object;
}

type AssistantClearResponse = ResourceResponse<AssistantClearedDto>;

interface IAssistantRESTApiClient {
	overview: (request: AssistantOverviewRequest) => Promise<AssistantOverviewResponse>;
	messages: (request: AssistantMessagesRequest) => Promise<AssistantMessagesResponse>;
	send: (request: AssistantSendRequest) => Promise<AssistantSendResponse>;
	clear: (request: AssistantClearRequest) => Promise<AssistantClearResponse>;
}

export type {
	IAssistantRESTApiClient,
	AssistantClearRequest,
	AssistantClearResponse,
	AssistantMessagesRequest,
	AssistantMessagesResponse,
	AssistantOverviewRequest,
	AssistantOverviewResponse,
	AssistantSendRequest,
	AssistantSendResponse,
};
