import type { CollectionResponse, ResourceResponse } from "@shared/api";
import type {
	AssistantAcceptedDto,
	AssistantClearedDto,
	AssistantDeltaDto,
	AssistantMessageDto,
	AssistantMessagesParams,
	AssistantOverviewDto,
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

type AssistantSendResponse = AssistantMessageDto;

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
