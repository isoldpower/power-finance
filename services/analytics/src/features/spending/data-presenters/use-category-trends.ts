import { useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { getCategoryTrends } from "../categories-api";
import { SPENDING_CACHE_KEYS } from "./cache-config.ts";

import type { UseQueryResult } from "@tanstack/react-query";
import type { AnalyticsQuery, Granularity, LedgerSide } from "@entity/filters";
import type { CategoryTrends } from "@entity/spending";


type UseCategoryTrendsReturn = UseQueryResult<CategoryTrends> & {
	trends: CategoryTrends | undefined;
};

const TRENDS_LIMIT = 6;

const useCategoryTrends = (
	query: AnalyticsQuery,
	side: LedgerSide,
	granularity: Granularity,
): UseCategoryTrendsReturn => {
	const { categoryServers } = useApiContext();

	const result = useQuery({
		queryKey: [SPENDING_CACHE_KEYS.trends, query, side, granularity],
		queryFn: () => getCategoryTrends({
			handler: categoryServers.rest,
			query,
			side,
			granularity,
			limit: TRENDS_LIMIT,
		}),
		placeholderData: keepPreviousData,
	});

	return useMemo(() => ({ ...result, trends: result.data }), [result]);
};

export { useCategoryTrends };
export type { UseCategoryTrendsReturn };
