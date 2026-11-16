import { request, WriteVersionStore } from "@internal/shared";

import type { AxiosInstance } from "axios";
import type { IMoneyFlowRESTApiClient, MoneyFlowRequest, MoneyFlowResponse } from "./types.ts";


class MoneyFlowHttpRESTApiClient implements IMoneyFlowRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public getMoneyFlow(payload: MoneyFlowRequest): Promise<MoneyFlowResponse> {
		return request<MoneyFlowResponse>(this.axiosInstance, {
			method: 'GET',
			url: '/money-flow',
			params: payload.params,
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}
}

export { MoneyFlowHttpRESTApiClient };
