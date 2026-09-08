import { useMemo } from "react";
import { useMetrics } from "./use-metrics.ts";

import type { BalanceMetrics } from "@entity/metrics";
import type { UseMetricsReturn } from "./use-metrics.ts";


type UseBalanceMetricsReturn = UseMetricsReturn & {
	balance: BalanceMetrics | undefined;
};

const useBalanceMetrics = (): UseBalanceMetricsReturn => {
	const query = useMetrics();

	return useMemo(() => ({
		...query,
		balance: query.data?.metrics.balance ?? undefined,
	}), [query]);
};

export { useBalanceMetrics };
export type { UseBalanceMetricsReturn };
