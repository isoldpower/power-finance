import { useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { getSpendingRhythm } from "../patterns-api";
import { SPENDING_CACHE_KEYS } from "./cache-config.ts";

import type { UseQueryResult } from "@tanstack/react-query";
import type { AnalyticsQuery, LedgerSide } from "@entity/filters";
import type { SpendingRhythm } from "@entity/spending";


type UseSpendingRhythmReturn = UseQueryResult<SpendingRhythm> & {
	rhythm: SpendingRhythm | undefined;
};

const useSpendingRhythm = (query: AnalyticsQuery, side: LedgerSide): UseSpendingRhythmReturn => {
	const { patternServers } = useApiContext();

	const result = useQuery({
		queryKey: [SPENDING_CACHE_KEYS.rhythm, query, side],
		queryFn: () => getSpendingRhythm({ handler: patternServers.rest, query, side }),
		placeholderData: keepPreviousData,
	});

	return useMemo(() => ({ ...result, rhythm: result.data }), [result]);
};

export { useSpendingRhythm };
export type { UseSpendingRhythmReturn };
