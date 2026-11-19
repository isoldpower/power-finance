import { useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { getMoneyFlow } from "../money-flow-api";
import { FLOW_CACHE_KEYS } from "./cache-config.ts";

import type { UseQueryResult } from "@tanstack/react-query";
import type { AnalyticsQuery } from "@entity/filters";
import type { MoneyFlow } from "@entity/flow";


type UseMoneyFlowReturn = UseQueryResult<MoneyFlow> & {
	moneyFlow: MoneyFlow | undefined;
};

const useMoneyFlow = (query: AnalyticsQuery): UseMoneyFlowReturn => {
	const { moneyFlowServers } = useApiContext();

	const result = useQuery({
		queryKey: [FLOW_CACHE_KEYS.moneyFlow, query],
		queryFn: () => getMoneyFlow({
			handler: moneyFlowServers.rest,
			query
		}),
		placeholderData: keepPreviousData,
	});

	return useMemo(() => ({ 
		...result,
		moneyFlow: result.data
	}), [result]);
};

export { useMoneyFlow };
export type { UseMoneyFlowReturn };
