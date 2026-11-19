import { useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { getBalanceHistory } from "../balances-api";
import { FLOW_CACHE_KEYS } from "./cache-config.ts";

import type { UseQueryResult } from "@tanstack/react-query";
import type { AnalyticsQuery } from "@entity/filters";
import type { BalanceHistory } from "@entity/flow";


type UseBalanceHistoryReturn = UseQueryResult<BalanceHistory> & {
	history: BalanceHistory | undefined;
};

const HISTORY_POINTS = 90;

const useBalanceHistory = (query: AnalyticsQuery): UseBalanceHistoryReturn => {
	const { balanceServers } = useApiContext();

	const result = useQuery({
		queryKey: [FLOW_CACHE_KEYS.balanceHistory, query],
		queryFn: () => getBalanceHistory({
			handler: balanceServers.rest,
			query, 
			points: HISTORY_POINTS
		}),
		placeholderData: keepPreviousData,
	});

	return useMemo(() => ({ 
		...result,
		history: result.data
	}), [result]);
};

export { useBalanceHistory };
export type { UseBalanceHistoryReturn };
