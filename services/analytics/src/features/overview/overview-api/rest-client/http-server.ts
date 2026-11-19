import { request, WriteVersionStore } from "@internal/shared";

import type { AxiosInstance } from "axios";
import type { IOverviewRESTApiClient, OverviewRequest, OverviewResponse } from "./types.ts";


class OverviewHttpRESTApiClient implements IOverviewRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public getOverview(payload: OverviewRequest): Promise<OverviewResponse> {
		return request<OverviewResponse>(this.axiosInstance, {
			method: 'GET',
			url: '/overview',
			params: payload.params,
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}
}

export { OverviewHttpRESTApiClient };
