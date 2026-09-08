import { request, WriteVersionStore } from "@shared/api";

import { AdviceSocket } from "./advice-socket.ts";
import type { AxiosInstance } from "axios";
import type { TokenSource } from "@shared/api";
import type {
	IAssistantRESTApiClient,
	AssistantClearRequest, AssistantClearResponse,
	AssistantMessagesRequest, AssistantMessagesResponse,
	AssistantOverviewRequest, AssistantOverviewResponse,
	AssistantSendRequest, AssistantSendResponse,
} from "./types.ts";


interface AssistantSocketOptions {
	url: string;
	authorize?: TokenSource;
}

class AssistantHttpRESTApiClient implements IAssistantRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;
	private readonly advice: AdviceSocket;

	constructor(
		axiosInstance: AxiosInstance,
		versions = new WriteVersionStore(),
		socket: AssistantSocketOptions,
	) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
		this.advice = new AdviceSocket(socket);
	}

	public overview(_payload: AssistantOverviewRequest): Promise<AssistantOverviewResponse> {
		return request<AssistantOverviewResponse>(this.axiosInstance, {
			method: 'GET',
			url: '/overview',
			headers: this.versions.headers(),
		}, this.versions);
	}

	public messages(payload: AssistantMessagesRequest): Promise<AssistantMessagesResponse> {
		return request<AssistantMessagesResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/messages`,
			params: { ...payload.params },
			headers: this.versions.headers(),
		}, this.versions);
	}

	public send(payload: AssistantSendRequest): Promise<AssistantSendResponse> {
		return this.advice.send(payload.data.text, {
			onAccepted: payload.onAccepted,
			onDelta: payload.onDelta,
		});
	}

	public clear(_payload: AssistantClearRequest): Promise<AssistantClearResponse> {
		return request<AssistantClearResponse>(this.axiosInstance, {
			method: 'DELETE',
			url: '/messages',
		}, this.versions);
	}
}

export { AssistantHttpRESTApiClient };
export type { AssistantSocketOptions };
