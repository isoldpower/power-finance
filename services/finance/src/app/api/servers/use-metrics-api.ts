import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { MetricsMockRESTApiClient } from "@feature/metrics";
import { API_BASE_PATH } from "../config.ts";
import type { IMetricsRESTApiClient } from "@feature/metrics";

interface UseMetricsApiResponse {
	rest: IMetricsRESTApiClient;
}

function useMetricsApi(baseUrl: string): UseMetricsApiResponse {
	const metricsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}${API_BASE_PATH}/metrics`
	});

	const restMetricsClient = useMemo<IMetricsRESTApiClient>(() => {
		return new MetricsMockRESTApiClient();
	}, [metricsAxiosInstance]);

	return useMemo(() => ({
		rest: restMetricsClient
	}), [restMetricsClient]);
}

export { useMetricsApi };
export type { UseMetricsApiResponse };
