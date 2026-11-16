import { request, WriteVersionStore } from "@internal/shared";

import type { AxiosInstance } from "axios";
import type {
	CategoryBreakdownRequest,
	CategoryBreakdownResponse,
	CategoryTrendsRequest,
	CategoryTrendsResponse,
	ICategoriesRESTApiClient,
} from "./types.ts";


class CategoriesHttpRESTApiClient implements ICategoriesRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public getBreakdown(payload: CategoryBreakdownRequest): Promise<CategoryBreakdownResponse> {
		return request<CategoryBreakdownResponse>(this.axiosInstance, {
			method: 'GET',
			url: '/categories',
			params: payload.params,
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}

	public getTrends(payload: CategoryTrendsRequest): Promise<CategoryTrendsResponse> {
		return request<CategoryTrendsResponse>(this.axiosInstance, {
			method: 'GET',
			url: '/category-trends',
			params: payload.params,
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}
}

export { CategoriesHttpRESTApiClient };
