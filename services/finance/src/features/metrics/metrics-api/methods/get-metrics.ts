import { metricsFromApi } from "../mutators";

import type { Metrics } from "@entity/metrics";
import type { MetricsQuery } from "../types.ts";
import type { IMetricsRESTApiClient } from "../rest-client";


interface GetMetricsRequest {
	handler: Pick<IMetricsRESTApiClient, 'get'>;
	query?: MetricsQuery;
}

interface GetMetricsResponse {
	metrics: Metrics;
	since: string | null;
	points: number;
}

async function getMetrics(request: GetMetricsRequest): Promise<GetMetricsResponse> {
	const response = await request.handler.get({ params: request.query });

	return {
		metrics: metricsFromApi(response.data),
		since: response.meta.since,
		points: response.meta.points,
	};
}

export { getMetrics };
export type { GetMetricsRequest, GetMetricsResponse };
