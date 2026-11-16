import { useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { getCashFlow } from "../cash-flow-api";
import { FLOW_CACHE_KEYS } from "./cache-config.ts";

import type { UseQueryResult } from "@tanstack/react-query";
import type { AnalyticsQuery, Granularity } from "@entity/filters";
import type { CashFlow } from "@entity/flow";


type UseCashFlowReturn = UseQueryResult<CashFlow> & {
	cashFlow: CashFlow | undefined;
};

const useCashFlow = (query: AnalyticsQuery, granularity: Granularity): UseCashFlowReturn => {
	const { cashFlowServers } = useApiContext();

	const result = useQuery({
		queryKey: [FLOW_CACHE_KEYS.cashFlow, query, granularity],
		queryFn: () => getCashFlow({ 
			handler: cashFlowServers.rest,
			query, granularity 
		}),
		placeholderData: keepPreviousData,
	});

	return useMemo(() => ({
		...result, 
		cashFlow: result.data
	}), [result]);
};

export { useCashFlow };
export type { UseCashFlowReturn };
