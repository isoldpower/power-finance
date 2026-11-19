import { request, WriteVersionStore } from "../../api/index.ts";

import type { AxiosInstance } from "axios";
import type { CurrencyListRequest, CurrencyListResponse, ICurrencyCatalogRESTApiClient } from "./types.ts";


class CurrencyCatalogHttpRESTApiClient implements ICurrencyCatalogRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public list(payload: CurrencyListRequest): Promise<CurrencyListResponse> {
		return request<CurrencyListResponse>(this.axiosInstance, {
			method: 'GET',
			url: '',
			params: { ...payload.params },
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}
}

export { CurrencyCatalogHttpRESTApiClient };
