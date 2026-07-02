import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { getLedgerBalance } from "@feature/metrics";
import { CACHE_KEYS } from "./cache-config.ts";
import type { LedgerBalance } from "@feature/metrics";

type UseLedgerBalanceOptions = Omit<UseQueryOptions<LedgerBalance>, 'queryKey' | 'queryFn'>;

type UseLedgerBalanceReturn = UseQueryResult<LedgerBalance> & {
	ledger?: LedgerBalance;
};

const useLedgerBalance = (
	options?: UseLedgerBalanceOptions
): UseLedgerBalanceReturn => {
	const apiContext = useApiContext();
	const query = useQuery<LedgerBalance>({
		queryKey: [CACHE_KEYS.ledgerBalance],
		queryFn: () => getLedgerBalance({
			handler: apiContext.summaryServers.rest,
		}),
		...options ?? {},
	});

	return useMemo(() => ({
		...query,
		ledger: query.data,
	}), [query]);
};

export { useLedgerBalance };
export type { UseLedgerBalanceOptions, UseLedgerBalanceReturn };
