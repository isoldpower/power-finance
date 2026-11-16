import { useMemo } from "react";
import { useCategoryBreakdown } from "@feature/spending";
import { useOverview } from "../data-presenters";

import type { AnalyticsQuery } from "@entity/filters";
import type { Overview } from "@entity/overview";
import type { CategoryBreakdown } from "@entity/spending";


interface InsightSources {
	overview: Overview;
	breakdown: CategoryBreakdown;
}

interface UseInsightSourcesReturn {
	sources: InsightSources | undefined;
	isPending: boolean;
	isError: boolean;
}

const useInsightSources = (query: AnalyticsQuery): UseInsightSourcesReturn => {
	const overviewQuery = useOverview(query);
	const breakdownQuery = useCategoryBreakdown(query, 'expense');

	return useMemo(() => {
		const { overview } = overviewQuery;
		const { breakdown } = breakdownQuery;

		return {
			sources: overview && breakdown ? { overview, breakdown } : undefined,
			isPending: overviewQuery.isPending || breakdownQuery.isPending,
			isError: overviewQuery.isError || breakdownQuery.isError,
		};
	}, [overviewQuery, breakdownQuery]);
};

export { useInsightSources };
export type { InsightSources, UseInsightSourcesReturn };
