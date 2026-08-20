import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { fetchAccount } from "../accounts-api";
import { ACCOUNTS_CACHE_KEYS } from "./cache-config.ts";

import type { UseQueryResult } from "@tanstack/react-query";
import type { Account, LedgerEntry } from "@entity/accounts";
import type { FetchAccountResponse } from "../accounts-api";


type UseAccountReturn = UseQueryResult<FetchAccountResponse> & {
	account: Account | undefined;
	history: LedgerEntry[];
};

const EMPTY_HISTORY: LedgerEntry[] = [];

const useAccount = (
	accountId: string
): UseAccountReturn => {
	const apiContext = useApiContext();
	const query = useQuery<FetchAccountResponse>({
		queryKey: [ACCOUNTS_CACHE_KEYS.fetch, accountId],
		queryFn: () => fetchAccount({
			handler: apiContext.accountServers.rest,
			id: accountId,
		}),
		enabled: accountId !== '',
	});

	return useMemo(() => ({
		...query,
		account: query.data?.account,
		history: query.data?.history.items ?? EMPTY_HISTORY,
	}), [query]);
};

export { useAccount };
export type { UseAccountReturn };
