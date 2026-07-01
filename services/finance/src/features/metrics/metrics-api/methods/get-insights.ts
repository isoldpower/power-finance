import type { ISummaryRESTApiClient, InsightMetric, Insights } from "../types.ts";

interface GetInsightsRequest {
	handler: Pick<ISummaryRESTApiClient, 'getInsights'>;
	metrics: InsightMetric[];
	range?: string;
}

type GetInsightsResponse = Insights;

async function getInsights(request: GetInsightsRequest): Promise<GetInsightsResponse> {
	return request.handler.getInsights({
		params: { metrics: request.metrics, range: request.range },
	});
}

export { getInsights };
export type { GetInsightsRequest, GetInsightsResponse };
