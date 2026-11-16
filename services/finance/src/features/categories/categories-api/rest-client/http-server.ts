import { idempotencyHeaders, request, WriteVersionStore } from "@internal/shared";

import type { AxiosInstance } from "axios";
import type {
	ICategoriesRESTApiClient,
	CategoryDeleteRequest, CategoryDeleteResponse,
	CategoryListRequest, CategoryListResponse,
	CategoryPatchRequest, CategoryPatchResponse,
	CategoryPostRequest, CategoryPostResponse,
} from "./types.ts";


class CategoriesHttpRESTApiClient implements ICategoriesRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public list(payload: CategoryListRequest): Promise<CategoryListResponse> {
		return request<CategoryListResponse>(this.axiosInstance, {
			method: 'GET',
			url: '',
			params: { ...payload.params },
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}

	public post(payload: CategoryPostRequest): Promise<CategoryPostResponse> {
		return request<CategoryPostResponse>(this.axiosInstance, {
			method: 'POST',
			url: '',
			data: payload.data,
			headers: idempotencyHeaders(payload.idempotencyKey),
		}, this.versions);
	}

	public patch(payload: CategoryPatchRequest): Promise<CategoryPatchResponse> {
		return request<CategoryPatchResponse>(this.axiosInstance, {
			method: 'PATCH',
			url: `/${payload.id}`,
			data: payload.data,
		}, this.versions);
	}

	public delete(payload: CategoryDeleteRequest): Promise<CategoryDeleteResponse> {
		return request<CategoryDeleteResponse>(this.axiosInstance, {
			method: 'DELETE',
			url: `/${payload.id}`,
		}, this.versions);
	}
}

export { CategoriesHttpRESTApiClient };
