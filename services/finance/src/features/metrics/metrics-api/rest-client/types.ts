import type { ApiEnvelope } from "@shared/api";
import type { MetricsDto, MetricsMetaDto, MetricsQuery } from "../types.ts";


interface MetricsRequest {
	params?: MetricsQuery;
}

type MetricsResponse = ApiEnvelope<MetricsDto, MetricsMetaDto>;

interface IMetricsRESTApiClient {
	get: (request: MetricsRequest) => Promise<MetricsResponse>;
}

export type { IMetricsRESTApiClient, MetricsRequest, MetricsResponse };
