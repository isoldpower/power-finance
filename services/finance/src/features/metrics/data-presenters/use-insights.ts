import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { getInsights } from "@feature/metrics";
import { METRICS_CACHE_KEYS } from "./cache-config.ts";
import type { Insights, InsightMetric, NetWorthInsight, CashFlowInsight } from "@feature/metrics";

interface UseInsightsParams {
	metrics: InsightMetric[];
	range?: string;
}

type UseInsightsOptions = Omit<UseQueryOptions<Insights>, 'queryKey' | 'queryFn'>;

type UseInsightsReturn = UseQueryResult<Insights> & {
	netWorth?: NetWorthInsight;
	cashFlow?: CashFlowInsight;
};

const useInsights = (
	params: UseInsightsParams,
	options?: UseInsightsOptions
): UseInsightsReturn => {
	const apiContext = useApiContext();
	const query = useQuery<Insights>({
		queryKey: [METRICS_CACHE_KEYS.insights, params.metrics.join(','), params.range ?? 'default'],
		queryFn: () => getInsights({
			handler: apiContext.summaryServers.rest,
			metrics: params.metrics,
			range: params.range,
		}),
		...options ?? {},
	});

	return useMemo(() => ({
		...query,
		netWorth: query.data?.net_worth,
		cashFlow: query.data?.cash_flow,
	}), [query]);
};

export { useInsights };
export type { UseInsightsParams, UseInsightsOptions, UseInsightsReturn };
