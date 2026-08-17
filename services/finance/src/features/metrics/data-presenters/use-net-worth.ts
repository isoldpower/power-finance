import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { getNetWorth } from "../metrics-api";
import { METRICS_CACHE_KEYS } from "./cache-config.ts";
import type { NetWorth } from "@entity/metrics";

interface UseNetWorthParams {
	since?: string;
	points?: number;
}

type UseNetWorthOptions = Omit<UseQueryOptions<NetWorth>, 'queryKey' | 'queryFn'>;

type UseNetWorthReturn = UseQueryResult<NetWorth> & {
	netWorth: NetWorth | undefined;
};

const useNetWorth = (
	params?: UseNetWorthParams,
	options?: UseNetWorthOptions
): UseNetWorthReturn => {
	const apiContext = useApiContext();
	const query = useQuery<NetWorth>({
		queryKey: [METRICS_CACHE_KEYS.netWorth, params?.since ?? 'all', params?.points ?? 'default'],
		queryFn: () => getNetWorth({
			handler: apiContext.metricsServers.rest,
			since: params?.since,
			points: params?.points,
		}),
		...options ?? {},
	});

	return useMemo(() => ({
		...query,
		netWorth: query.data,
	}), [query]);
};

export { useNetWorth };
export type { UseNetWorthOptions, UseNetWorthParams, UseNetWorthReturn };
