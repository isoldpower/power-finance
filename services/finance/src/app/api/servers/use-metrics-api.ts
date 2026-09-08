import { useMemo } from "react";

import { MetricsHttpRESTApiClient, MetricsMockRESTApiClient } from "@feature/metrics";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { IMetricsRESTApiClient } from "@feature/metrics";
import type { ApiServerOptions } from "./types.ts";


const METRICS_PATH = '/metrics';

interface UseMetricsApiResponse {
	rest: IMetricsRESTApiClient;
}

function useMetricsApi(options: ApiServerOptions): UseMetricsApiResponse {
	const axiosInstance = useResourceAxios(options, METRICS_PATH);

	const restClient = useMemo<IMetricsRESTApiClient>(() => {
		return options.mode === 'live'
			? new MetricsHttpRESTApiClient(axiosInstance, options.versions)
			: new MetricsMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions]);

	return useMemo(() => ({
		rest: restClient
	}), [restClient]);
}

export { useMetricsApi };
export type { UseMetricsApiResponse };
