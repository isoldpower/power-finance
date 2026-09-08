import { useMemo } from "react";
import { useMetrics } from "./use-metrics.ts";

import type { CashFlow } from "@entity/metrics";
import type { UseMetricsReturn } from "./use-metrics.ts";


interface UseCashFlowParams {
	since?: string;
}

type UseCashFlowReturn = UseMetricsReturn & {
	cashFlow: CashFlow | undefined;
};

const useCashFlow = (params?: UseCashFlowParams): UseCashFlowReturn => {
	const query = useMetrics({ since: params?.since });

	return useMemo(() => ({
		...query,
		cashFlow: query.data?.metrics.cashFlow ?? undefined,
	}), [query]);
};

export { useCashFlow };
export type { UseCashFlowParams, UseCashFlowReturn };
