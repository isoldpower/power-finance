import { useMemo } from "react";

import { AnalyticsDjangoRESTApiClient } from "@feature/analytics";
import type { IAnalyticsRESTApiClient } from "@feature/analytics";
import { useAxiosInstance } from "@internal/shared";


interface UseAnalyticsApiResponse {
	rest: IAnalyticsRESTApiClient;
}

function useAnalyticsApi(baseUrl: string): UseAnalyticsApiResponse {
	const analyticsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/analytics`
	});

	const restAnalyticsClient = useMemo<IAnalyticsRESTApiClient>(() => {
		return new AnalyticsDjangoRESTApiClient(analyticsAxiosInstance);
	}, [analyticsAxiosInstance]);

	return useMemo(() => ({
		rest: restAnalyticsClient
	}), [restAnalyticsClient]);
}

export { useAnalyticsApi };
