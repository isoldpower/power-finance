import type { ApiEnvelope, CacheMeta } from "@shared/api";
import type { BalanceMetricsDto, CashFlowDto, CashFlowParams, NetWorthDto, NetWorthParams } from "../types.ts";


interface BalanceMetricsRequest {
	params?: object;
}

type BalanceMetricsResponse = ApiEnvelope<BalanceMetricsDto, CacheMeta>;

interface NetWorthRequest {
	params?: NetWorthParams;
}

type NetWorthResponse = ApiEnvelope<NetWorthDto, CacheMeta & { since: string | null; points: number }>;

interface CashFlowRequest {
	params?: CashFlowParams;
}

type CashFlowResponse = ApiEnvelope<CashFlowDto, CacheMeta & { since: string | null }>;

interface IMetricsRESTApiClient {
	balance: (request: BalanceMetricsRequest) => Promise<BalanceMetricsResponse>;
	netWorth: (request: NetWorthRequest) => Promise<NetWorthResponse>;
	cashFlow: (request: CashFlowRequest) => Promise<CashFlowResponse>;
}

export type {
	BalanceMetricsRequest,
	BalanceMetricsResponse,
	CashFlowRequest,
	CashFlowResponse,
	IMetricsRESTApiClient,
	NetWorthRequest,
	NetWorthResponse,
};
