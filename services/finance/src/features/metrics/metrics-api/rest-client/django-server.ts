import { buildQuery, request, WriteVersionStore } from "@shared/api";
import type { AxiosInstance } from "axios";
import type {
	BalanceMetricsRequest, BalanceMetricsResponse,
	CashFlowRequest, CashFlowResponse,
	IMetricsRESTApiClient,
	NetWorthRequest, NetWorthResponse,
} from "./types.ts";

class MetricsDjangoRESTApiClient implements IMetricsRESTApiClient {
	private readonly axiosInstance: AxiosInstance;
	private readonly versions: WriteVersionStore;

	constructor(axiosInstance: AxiosInstance, versions = new WriteVersionStore()) {
		this.axiosInstance = axiosInstance;
		this.versions = versions;
	}

	public balance(payload: BalanceMetricsRequest): Promise<BalanceMetricsResponse> {
		return request<BalanceMetricsResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/balance/${buildQuery({ ...payload.params })}`,
			headers: this.versions.headers(),
		}, this.versions);
	}

	public netWorth(payload: NetWorthRequest): Promise<NetWorthResponse> {
		return request<NetWorthResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/net-worth/${buildQuery({ ...payload.params })}`,
			headers: this.versions.headers(),
		}, this.versions);
	}

	public cashFlow(payload: CashFlowRequest): Promise<CashFlowResponse> {
		return request<CashFlowResponse>(this.axiosInstance, {
			method: 'GET',
			url: `/cash-flow/${buildQuery({ ...payload.params })}`,
			headers: this.versions.headers(),
		}, this.versions);
	}
}

export { MetricsDjangoRESTApiClient };
