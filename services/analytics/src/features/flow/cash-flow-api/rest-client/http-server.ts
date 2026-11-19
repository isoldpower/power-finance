import { request, WriteVersionStore } from "@internal/shared";

import type { AxiosInstance } from "axios";
import type { CashFlowRequest, CashFlowResponse, ICashFlowRESTApiClient } from "./types.ts";


class CashFlowHttpRESTApiClient implements ICashFlowRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public getCashFlow(payload: CashFlowRequest): Promise<CashFlowResponse> {
		return request<CashFlowResponse>(this.axiosInstance, {
			method: 'GET',
			url: '/cash-flow',
			params: payload.params,
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}
}

export { CashFlowHttpRESTApiClient };
