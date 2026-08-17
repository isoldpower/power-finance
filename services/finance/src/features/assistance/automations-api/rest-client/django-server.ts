import { buildQuery, idempotencyHeaders, request, WriteVersionStore } from "@shared/api";

import type { AxiosInstance } from "axios";
import type {
	IAutomationsRESTApiClient,
	AutomationDeleteRequest, AutomationDeleteResponse,
	AutomationGetRequest, AutomationGetResponse,
	AutomationListRequest, AutomationListResponse,
	AutomationPatchRequest, AutomationPatchResponse,
	AutomationPostRequest, AutomationPostResponse,
} from "./types.ts";


class AutomationsDjangoRESTApiClient implements IAutomationsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public list(payload: AutomationListRequest): Promise<AutomationListResponse> {
		return request<AutomationListResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/${buildQuery({ ...payload.params })}`,
			headers: this.versions.headers(),
		}, this.versions);
	}

	public get(payload: AutomationGetRequest): Promise<AutomationGetResponse> {
		return request<AutomationGetResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/${payload.id}/`,
			headers: this.versions.headers(),
		}, this.versions);
	}

	public post(payload: AutomationPostRequest): Promise<AutomationPostResponse> {
		return request<AutomationPostResponse>(this.axiosInstance, {
			method: 'POST',
			url: '/',
			data: payload.data,
			headers: idempotencyHeaders(payload.idempotencyKey),
		}, this.versions);
	}

	public patch(payload: AutomationPatchRequest): Promise<AutomationPatchResponse> {
		return request<AutomationPatchResponse>(this.axiosInstance, {
			method: 'PATCH',
			url: `/${payload.id}/`,
			data: payload.data,
		}, this.versions);
	}

	public delete(payload: AutomationDeleteRequest): Promise<AutomationDeleteResponse> {
		return request<AutomationDeleteResponse>(this.axiosInstance, {
			method: 'DELETE',
			url: `/${payload.id}/`,
		}, this.versions);
	}
}

export { AutomationsDjangoRESTApiClient };
