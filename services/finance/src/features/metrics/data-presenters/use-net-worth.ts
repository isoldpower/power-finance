import { useMemo } from "react";
import { useMetrics } from "./use-metrics.ts";

import type { NetWorth } from "@entity/metrics";
import type { UseMetricsReturn } from "./use-metrics.ts";


interface UseNetWorthParams {
	since?: string;
	points?: number;
}

type UseNetWorthReturn = UseMetricsReturn & {
	netWorth: NetWorth | undefined;
};

const useNetWorth = (params?: UseNetWorthParams): UseNetWorthReturn => {
	const query = useMetrics(params);

	return useMemo(() => ({
		...query,
		netWorth: query.data?.metrics.netWorth ?? undefined,
	}), [query]);
};

export { useNetWorth };
export type { UseNetWorthParams, UseNetWorthReturn };
