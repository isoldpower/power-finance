import {
	ApiError,
	apiErrorFromEnvelope,
	buildQuery,
	IDEMPOTENCY_HEADER,
	openEventStream,
	request,
	WriteVersionStore,
} from "@shared/api";
import type { AxiosInstance } from "axios";
import type { AssistantAcceptedDto, AssistantDeltaDto, AssistantMessageDto } from "../types.ts";
import type {
	IAssistantRESTApiClient,
	AssistantClearRequest, AssistantClearResponse,
	AssistantMessagesRequest, AssistantMessagesResponse,
	AssistantOverviewRequest, AssistantOverviewResponse,
	AssistantSendRequest, AssistantSendResponse,
} from "./types.ts";


const ACCEPTED_EVENT = 'accepted';
const DELTA_EVENT = 'delta';
const MESSAGE_EVENT = 'message';
const ERROR_EVENT = 'error';

class AssistantDjangoRESTApiClient implements IAssistantRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public overview(_payload: AssistantOverviewRequest): Promise<AssistantOverviewResponse> {
		return request<AssistantOverviewResponse>(this.axiosInstance, {
			method: 'GET',
			url: '/overview/',
			headers: this.versions.headers(),
		}, this.versions);
	}

	public messages(payload: AssistantMessagesRequest): Promise<AssistantMessagesResponse> {
		return request<AssistantMessagesResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/messages/${buildQuery({ ...payload.params })}`,
			headers: this.versions.headers(),
		}, this.versions);
	}

	public send(payload: AssistantSendRequest): Promise<AssistantSendResponse> {
		return new Promise<AssistantSendResponse>((resolve, reject) => {
			let settled = false;

			const close = openEventStream({
				url: `${this.axiosInstance.defaults.baseURL ?? ''}/messages/`,
				method: 'POST',
				body: payload.data,
				headers: payload.idempotencyKey ? { [IDEMPOTENCY_HEADER]: payload.idempotencyKey } : {},
				signal: payload.signal,
			}, {
				onMessage: (message) => {
					if (message.event === ACCEPTED_EVENT) {
						payload.onAccepted?.(JSON.parse(message.data) as AssistantAcceptedDto);

						return;
					}

					if (message.event === DELTA_EVENT) {
						payload.onDelta?.(JSON.parse(message.data) as AssistantDeltaDto);

						return;
					}

					if (message.event === MESSAGE_EVENT) {
						settled = true;
						resolve(JSON.parse(message.data) as AssistantMessageDto);
						close();

						return;
					}

					if (message.event === ERROR_EVENT) {
						settled = true;
						reject(apiErrorFromEnvelope(JSON.parse(message.data), 'Assistant generation failed'));
						close();
					}
				},
				onError: reject,
				onClose: () => {
					if (!settled) reject(new ApiError(
						'assistant_unavailable',
						'Assistant closed the stream without a reply',
					));
				},
			});
		});
	}

	public clear(_payload: AssistantClearRequest): Promise<AssistantClearResponse> {
		return request<AssistantClearResponse>(this.axiosInstance, {
			method: 'DELETE',
			url: '/messages/',
		}, this.versions);
	}
}

export { AssistantDjangoRESTApiClient };
