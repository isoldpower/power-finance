import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { fetchAccount } from "../accounts-api";
import { ACCOUNTS_CACHE_KEYS } from "./cache-config.ts";
import type { LedgerEntry } from "@entity/accounts";
import type { FetchAccountResponse } from "../accounts-api";

type UseAccountEntriesOptions = Omit<UseQueryOptions<FetchAccountResponse>, 'queryKey' | 'queryFn'>;

type UseAccountEntriesReturn = UseQueryResult<FetchAccountResponse> & {
	entries: LedgerEntry[];
};

const EMPTY_ENTRIES: LedgerEntry[] = [];

const useAccountEntries = (
	accountId: string,
	options?: UseAccountEntriesOptions
): UseAccountEntriesReturn => {
	const apiContext = useApiContext();
	const query = useQuery<FetchAccountResponse>({
		queryKey: [ACCOUNTS_CACHE_KEYS.entries, accountId],
		queryFn: () => fetchAccount({
			handler: apiContext.accountServers.rest,
			id: accountId,
		}),
		enabled: accountId !== '',
		...options ?? {},
	});

	return useMemo(() => ({
		...query,
		entries: query.data?.history.items ?? EMPTY_ENTRIES,
	}), [query]);
};

export { useAccountEntries };
export type { UseAccountEntriesOptions, UseAccountEntriesReturn };
