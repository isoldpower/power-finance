import { idempotencyHeaders, request, WriteVersionStore } from "@shared/api";

import type { AxiosInstance } from "axios";
import type {
	IActionsRESTApiClient,
	ActionListRequest, ActionListResponse,
	ActionResolveRequest, ActionResolveResponse,
} from "./types.ts";


class ActionsHttpRESTApiClient implements IActionsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public list(payload: ActionListRequest): Promise<ActionListResponse> {
		return request<ActionListResponse>(this.axiosInstance, {
			method: 'GET',
			url: '',
			params: { ...payload.params },
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}

	public resolve(payload: ActionResolveRequest): Promise<ActionResolveResponse> {
		return request<ActionResolveResponse>(this.axiosInstance, {
			method: 'POST',
			url: `/${payload.id}/resolve`,
			data: payload.data,
			headers: idempotencyHeaders(payload.idempotencyKey),
		}, this.versions);
	}
}

export { ActionsHttpRESTApiClient };
