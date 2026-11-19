import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { getDrillTransactions } from "../transactions-api";
import { drillScope } from "../drill";
import { TRANSACTIONS_CACHE_KEYS } from "./cache-config.ts";

import type { UseQueryResult } from "@tanstack/react-query";
import type { AnalyticsQuery, Drill } from "@entity/filters";
import type { DrillTransactions, TransactionsOrder } from "@entity/transactions";


type UseDrillTransactionsReturn = UseQueryResult<DrillTransactions> & {
	transactions: DrillTransactions | undefined;
};

const DRILL_LIMIT = 50;

const useDrillTransactions = (
	drill: Drill | null,
	base: AnalyticsQuery,
	order: TransactionsOrder,
): UseDrillTransactionsReturn => {
	const { transactionServers } = useApiContext();
	const scope = useMemo(() => (drill ? drillScope(drill, base) : null), [drill, base]);

	const result = useQuery({
		queryKey: [TRANSACTIONS_CACHE_KEYS.drill, scope, order],
		queryFn: () => getDrillTransactions({
			handler: transactionServers.rest,
			query: scope?.query ?? base,
			filter: scope?.filter ?? {},
			order,
			limit: DRILL_LIMIT,
		}),
		enabled: scope !== null,
	});

	return useMemo(() => ({ ...result, transactions: result.data }), [result]);
};

export { useDrillTransactions };
export type { UseDrillTransactionsReturn };
