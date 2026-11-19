import { request, WriteVersionStore } from "@internal/shared";

import type { AxiosInstance } from "axios";
import type {
	CounterpartiesRequest,
	CounterpartiesResponse,
	ITransactionsRESTApiClient,
	TransactionsRequest,
	TransactionsResponse,
} from "./types.ts";


class TransactionsHttpRESTApiClient implements ITransactionsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public getCounterparties(payload: CounterpartiesRequest): Promise<CounterpartiesResponse> {
		return request<CounterpartiesResponse>(this.axiosInstance, {
			method: 'GET',
			url: '/counterparties',
			params: payload.params,
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}

	public getTransactions(payload: TransactionsRequest): Promise<TransactionsResponse> {
		return request<TransactionsResponse>(this.axiosInstance, {
			method: 'GET',
			url: '/transactions',
			params: payload.params,
			headers: this.versions.readAtLeastHeaders(),
		}, this.versions);
	}
}

export { TransactionsHttpRESTApiClient };
