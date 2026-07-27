import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { listAccountEntries } from "../accounts-api";
import { ACCOUNTS_CACHE_KEYS } from "./cache-config.ts";
import type { LedgerEntryDto } from "@entity/accounts";
import type { ListAccountEntriesResponse } from "../accounts-api";


type UseAccountEntriesOptions = Omit<UseQueryOptions<ListAccountEntriesResponse>, 'queryKey' | 'queryFn'>;

type UseAccountEntriesReturn = UseQueryResult<ListAccountEntriesResponse> & {
	entries: LedgerEntryDto[];
};

const useAccountEntries = (
	accountId: string,
	options?: UseAccountEntriesOptions
): UseAccountEntriesReturn => {
	const apiContext = useApiContext();
	const query = useQuery<ListAccountEntriesResponse>({
		queryKey: [ACCOUNTS_CACHE_KEYS.entries, accountId],
		queryFn: () => listAccountEntries({
			handler: apiContext.accountServers.rest,
			payload: { id: accountId },
		}),
		enabled: accountId !== '',
		...options ?? {},
	});

	return useMemo(() => ({
		...query,
		entries: query.data?.data ?? [],
	}), [query]);
};

export { useAccountEntries };
export type { UseAccountEntriesOptions, UseAccountEntriesReturn };
