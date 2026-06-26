import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { SummaryMockRESTApiClient, SummaryDjangoRESTApiClient } from "@feature/summary";
import type { ISummaryRESTApiClient } from "@feature/summary";

const USE_DJANGO_BACKEND: boolean = false;

interface UseSummaryApiResponse {
	rest: ISummaryRESTApiClient;
}

function useSummaryApi(baseUrl: string): UseSummaryApiResponse {
	const summaryAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/summary`
	});

	const restSummaryClient = useMemo<ISummaryRESTApiClient>(() => {
		return USE_DJANGO_BACKEND
			? new SummaryDjangoRESTApiClient(summaryAxiosInstance)
			: new SummaryMockRESTApiClient();
	}, [summaryAxiosInstance]);

	return useMemo(() => ({
		rest: restSummaryClient
	}), [restSummaryClient]);
}

export { useSummaryApi };
export type { UseSummaryApiResponse };
