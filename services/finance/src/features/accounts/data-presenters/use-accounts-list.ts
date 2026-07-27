import type { UseQueryOptions } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { useResourceQuery } from "@shared/data";
import type { UseResourceQueryResult } from "@shared/data";
import { listAccounts } from "../accounts-api";
import { ACCOUNTS_CACHE_KEYS } from "./cache-config.ts";
import type { Account } from "@entity/accounts";
import type { ListAccountsResponse } from "../accounts-api";


type UseAccountsListOptions = Omit<UseQueryOptions<ListAccountsResponse>, 'queryKey' | 'queryFn'>;

type UseAccountsListReturn = UseResourceQueryResult<ListAccountsResponse, Account[]> & {
	accounts: Account[];
};

const EMPTY_ACCOUNTS: Account[] = [];

const useAccountsList = (
	options?: UseAccountsListOptions
): UseAccountsListReturn => {
	const apiContext = useApiContext();
	const query = useResourceQuery<ListAccountsResponse, Account[]>({
		key: [ACCOUNTS_CACHE_KEYS.list],
		fetch: () => listAccounts({ handler: apiContext.accountServers.rest }),
		select: (response) => response.data,
		fallback: EMPTY_ACCOUNTS,
		options,
	});

	return { ...query, accounts: query.value };
};

export { useAccountsList };
export type { UseAccountsListOptions, UseAccountsListReturn };
