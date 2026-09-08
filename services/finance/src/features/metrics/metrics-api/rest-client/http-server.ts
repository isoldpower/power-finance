import { request, WriteVersionStore } from "@shared/api";

import type { AxiosInstance } from "axios";
import type { MetricsQuery } from "../types.ts";
import type { IMetricsRESTApiClient, MetricsRequest, MetricsResponse } from "./types.ts";


const SECTION_PARAMS = {
	balance: 'balance',
	netWorth: 'net-worth',
	cashFlow: 'cash-flow',
} as const;

function metricsQuery(params: MetricsQuery | undefined): Record<string, string | number | undefined> {
	return {
		[SECTION_PARAMS.balance]: params?.balance === undefined ? undefined : String(params.balance),
		[SECTION_PARAMS.netWorth]: params?.netWorth === undefined ? undefined : String(params.netWorth),
		[SECTION_PARAMS.cashFlow]: params?.cashFlow === undefined ? undefined : String(params.cashFlow),
		since: params?.since,
		points: params?.points,
	};
}

class MetricsHttpRESTApiClient implements IMetricsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public get(payload: MetricsRequest): Promise<MetricsResponse> {
		return request<MetricsResponse>(this.axiosInstance, {
			method: 'GET',
			url: '',
			params: metricsQuery(payload.params),
			headers: this.versions.headers(),
		}, this.versions);
	}
}

export { MetricsHttpRESTApiClient };
