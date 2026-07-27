import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { SummaryMockRESTApiClient } from "@feature/metrics";
import type { ISummaryRESTApiClient } from "@feature/metrics";


interface UseSummaryApiResponse {
	rest: ISummaryRESTApiClient;
}

function useSummaryApi(baseUrl: string): UseSummaryApiResponse {
	const summaryAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/summary`
	});

	const restSummaryClient = useMemo<ISummaryRESTApiClient>(() => {
		return new SummaryMockRESTApiClient();
	}, [summaryAxiosInstance]);

	return useMemo(() => ({
		rest: restSummaryClient
	}), [restSummaryClient]);
}

export { useSummaryApi };
export type { UseSummaryApiResponse };
