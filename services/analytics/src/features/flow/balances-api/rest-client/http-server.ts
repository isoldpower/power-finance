import { request, WriteVersionStore } from "@internal/shared";

import type { AxiosInstance } from "axios";
import type { IBalancesRESTApiClient, BalanceHistoryRequest, BalanceHistoryResponse } from "./types.ts";


class BalancesHttpRESTApiClient implements IBalancesRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public getBalanceHistory(payload: BalanceHistoryRequest): Promise<BalanceHistoryResponse> {
		return request<BalanceHistoryResponse>(this.axiosInstance, {
			method: 'GET',
			url: '/balance-history',
			params: payload.params,
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}
}

export { BalancesHttpRESTApiClient };
