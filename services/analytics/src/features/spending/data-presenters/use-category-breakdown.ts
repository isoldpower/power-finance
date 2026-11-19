import { useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { getCategoryBreakdown } from "../categories-api";
import { SPENDING_CACHE_KEYS } from "./cache-config.ts";

import type { UseQueryResult } from "@tanstack/react-query";
import type { AnalyticsQuery, LedgerSide } from "@entity/filters";
import type { CategoryBreakdown } from "@entity/spending";


type UseCategoryBreakdownReturn = UseQueryResult<CategoryBreakdown> & {
	breakdown: CategoryBreakdown | undefined;
};

const useCategoryBreakdown = (query: AnalyticsQuery, side: LedgerSide): UseCategoryBreakdownReturn => {
	const { categoryServers } = useApiContext();

	const result = useQuery({
		queryKey: [SPENDING_CACHE_KEYS.breakdown, query, side],
		queryFn: () => getCategoryBreakdown({ handler: categoryServers.rest, query, side }),
		placeholderData: keepPreviousData,
	});

	return useMemo(() => ({ ...result, breakdown: result.data }), [result]);
};

export { useCategoryBreakdown };
export type { UseCategoryBreakdownReturn };
