import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { getBalanceMetrics } from "../metrics-api";
import { METRICS_CACHE_KEYS } from "./cache-config.ts";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { BalanceMetrics } from "@entity/metrics";


type UseBalanceMetricsOptions = Omit<UseQueryOptions<BalanceMetrics>, 'queryKey' | 'queryFn'>;

type UseBalanceMetricsReturn = UseQueryResult<BalanceMetrics> & {
	balance: BalanceMetrics | undefined;
};

const useBalanceMetrics = (
	options?: UseBalanceMetricsOptions
): UseBalanceMetricsReturn => {
	const apiContext = useApiContext();
	const query = useQuery<BalanceMetrics>({
		queryKey: [METRICS_CACHE_KEYS.balance],
		queryFn: () => getBalanceMetrics({
			handler: apiContext.metricsServers.rest,
		}),
		...options ?? {},
	});

	return useMemo(() => ({
		...query,
		balance: query.data,
	}), [query]);
};

export { useBalanceMetrics };
export type { UseBalanceMetricsOptions, UseBalanceMetricsReturn };
