import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { getMetrics } from "../metrics-api";
import { METRICS_CACHE_KEYS } from "./cache-config.ts";

import type { UseQueryResult } from "@tanstack/react-query";
import type { GetMetricsResponse } from "../metrics-api";


interface UseMetricsParams {
	since?: string;
	points?: number;
}

type UseMetricsReturn = UseQueryResult<GetMetricsResponse>;

const useMetrics = (params?: UseMetricsParams): UseMetricsReturn => {
	const apiContext = useApiContext();

	return useQuery<GetMetricsResponse>({
		queryKey: [METRICS_CACHE_KEYS.metrics, params?.since ?? 'all', params?.points ?? 'default'],
		queryFn: () => getMetrics({
			handler: apiContext.metricsServers.rest,
			query: { since: params?.since, points: params?.points },
		}),
	});
};

export { useMetrics };
export type { UseMetricsParams, UseMetricsReturn };
