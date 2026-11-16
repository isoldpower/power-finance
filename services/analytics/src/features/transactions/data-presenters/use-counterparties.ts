import { useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { getCounterparties } from "../transactions-api";
import { TRANSACTIONS_CACHE_KEYS } from "./cache-config.ts";

import type { UseQueryResult } from "@tanstack/react-query";
import type { AnalyticsQuery, LedgerSide } from "@entity/filters";
import type { CounterpartyRanking } from "@entity/transactions";


type UseCounterpartiesReturn = UseQueryResult<CounterpartyRanking> & {
	ranking: CounterpartyRanking | undefined;
};

const COUNTERPARTIES_LIMIT = 8;

const useCounterparties = (query: AnalyticsQuery, side: LedgerSide): UseCounterpartiesReturn => {
	const { transactionServers } = useApiContext();

	const result = useQuery({
		queryKey: [TRANSACTIONS_CACHE_KEYS.counterparties, query, side],
		queryFn: () => getCounterparties({ handler: transactionServers.rest, query, side, limit: COUNTERPARTIES_LIMIT }),
		placeholderData: keepPreviousData,
	});

	return useMemo(() => ({ ...result, ranking: result.data }), [result]);
};

export { useCounterparties };
export type { UseCounterpartiesReturn };
