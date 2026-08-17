import { buildQuery, request, WriteVersionStore } from "@shared/api";

import type { AxiosInstance } from "axios";
import type {
	CurrencyConvertRequest, CurrencyConvertResponse,
	CurrencyListRequest, CurrencyListResponse,
	CurrencyRatesRequest, CurrencyRatesResponse,
	ICurrenciesRESTApiClient,
} from "./types.ts";


class CurrenciesDjangoRESTApiClient implements ICurrenciesRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public list(payload: CurrencyListRequest): Promise<CurrencyListResponse> {
		return request<CurrencyListResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/${buildQuery({ ...payload.params })}`,
			headers: this.versions.headers(),
		}, this.versions);
	}

	public convert(payload: CurrencyConvertRequest): Promise<CurrencyConvertResponse> {
		return request<CurrencyConvertResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/convert/${buildQuery({ ...payload.params })}`,
			headers: this.versions.headers(),
		}, this.versions);
	}

	public rates(payload: CurrencyRatesRequest): Promise<CurrencyRatesResponse> {
		return request<CurrencyRatesResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/rates/${payload.code}/${buildQuery({ target: payload.params?.target })}`,
			headers: this.versions.headers(),
		}, this.versions);
	}
}

export { CurrenciesDjangoRESTApiClient };
