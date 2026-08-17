import { buildQuery, idempotencyHeaders, request, WriteVersionStore } from "@shared/api";
import type { AxiosInstance } from "axios";
import type {
	IGoalsRESTApiClient,
	GoalDeleteRequest, GoalDeleteResponse,
	GoalGetRequest, GoalGetResponse,
	GoalListRequest, GoalListResponse,
	GoalPatchRequest, GoalPatchResponse,
	GoalPostRequest, GoalPostResponse,
} from "./types.ts";

class GoalsDjangoRESTApiClient implements IGoalsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public list(payload: GoalListRequest): Promise<GoalListResponse> {
		return request<GoalListResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/${buildQuery({ ...payload.params })}`,
			headers: this.versions.headers(),
		}, this.versions);
	}

	public get(payload: GoalGetRequest): Promise<GoalGetResponse> {
		return request<GoalGetResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/${payload.id}/${buildQuery({ ...payload.params })}`,
			headers: this.versions.headers(),
		}, this.versions);
	}

	public post(payload: GoalPostRequest): Promise<GoalPostResponse> {
		return request<GoalPostResponse>(this.axiosInstance, {
			method: 'POST',
			url: '/',
			data: payload.data,
			headers: idempotencyHeaders(payload.idempotencyKey),
		}, this.versions);
	}

	public patch(payload: GoalPatchRequest): Promise<GoalPatchResponse> {
		return request<GoalPatchResponse>(this.axiosInstance, {
			method: 'PATCH',
			url: `/${payload.id}/`,
			data: payload.data,
		}, this.versions);
	}

	public delete(payload: GoalDeleteRequest): Promise<GoalDeleteResponse> {
		return request<GoalDeleteResponse>(this.axiosInstance, {
			method: 'DELETE',
			url: `/${payload.id}/`,
		}, this.versions);
	}
}

export { GoalsDjangoRESTApiClient };
