import { useMemo } from "react";
import { autoGranularity } from "@entity/filters";
import { useCashFlow } from "@feature/flow";
import { useOverview } from "../data-presenters";

import type { AnalyticsQuery } from "@entity/filters";
import type { CashFlow } from "@entity/flow";
import type { Overview } from "@entity/overview";


interface KpiSources {
	overview: Overview;
	cashFlow: CashFlow;
}

interface UseKpiSourcesReturn {
	sources: KpiSources | undefined;
	isPending: boolean;
	isError: boolean;
}

const useKpiSources = (query: AnalyticsQuery): UseKpiSourcesReturn => {
	const granularity = useMemo(() => autoGranularity(query.range), [query.range]);
	const overviewQuery = useOverview(query);
	const cashFlowQuery = useCashFlow(query, granularity);

	return useMemo(() => {
		const { overview } = overviewQuery;
		const { cashFlow } = cashFlowQuery;

		return {
			sources: overview && cashFlow ? { overview, cashFlow } : undefined,
			isPending: overviewQuery.isPending || cashFlowQuery.isPending,
			isError: overviewQuery.isError || cashFlowQuery.isError,
		};
	}, [overviewQuery, cashFlowQuery]);
};

export { useKpiSources };
export type { KpiSources, UseKpiSourcesReturn };
