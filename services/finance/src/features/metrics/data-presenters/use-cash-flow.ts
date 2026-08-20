import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { getCashFlow } from "../metrics-api";
import { METRICS_CACHE_KEYS } from "./cache-config.ts";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { CashFlow } from "@entity/metrics";


interface UseCashFlowParams {
	since?: string;
}

type UseCashFlowOptions = Omit<UseQueryOptions<CashFlow>, 'queryKey' | 'queryFn'>;

type UseCashFlowReturn = UseQueryResult<CashFlow> & {
	cashFlow: CashFlow | undefined;
};

const useCashFlow = (
	params?: UseCashFlowParams,
	options?: UseCashFlowOptions
): UseCashFlowReturn => {
	const apiContext = useApiContext();
	const query = useQuery<CashFlow>({
		queryKey: [METRICS_CACHE_KEYS.cashFlow, params?.since ?? 'all'],
		queryFn: () => getCashFlow({
			handler: apiContext.metricsServers.rest,
			since: params?.since,
		}),
		...options ?? {},
	});

	return useMemo(() => ({
		...query,
		cashFlow: query.data,
	}), [query]);
};

export { useCashFlow };
export type { UseCashFlowOptions, UseCashFlowParams, UseCashFlowReturn };
