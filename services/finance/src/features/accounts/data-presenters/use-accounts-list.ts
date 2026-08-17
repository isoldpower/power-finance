import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { listAccounts } from "../accounts-api";
import { ACCOUNTS_CACHE_KEYS } from "./cache-config.ts";
import type { PageParams } from "@shared/api";
import type { Account, AccountGroupCounts, AccountGroupFilter } from "@entity/accounts";
import type { Money } from "@entity/localization";
import type { ListAccountsResponse } from "../accounts-api";

interface UseAccountsListParams extends PageParams {
	group?: AccountGroupFilter;
	lowbar?: Money;
}

type UseAccountsListOptions = Omit<UseQueryOptions<ListAccountsResponse>, 'queryKey' | 'queryFn'>;

type UseAccountsListReturn = UseQueryResult<ListAccountsResponse> & {
	accounts: Account[];
	groups: AccountGroupCounts;
	total: number;
	nextCursor: string | null;
	prevCursor: string | null;
};

const EMPTY_ACCOUNTS: Account[] = [];

const EMPTY_GROUPS: AccountGroupCounts = { assets: 0, liabilities: 0, equity: 0 };

const useAccountsList = (
	params?: UseAccountsListParams,
	options?: UseAccountsListOptions
): UseAccountsListReturn => {
	const apiContext = useApiContext();
	const query = useQuery<ListAccountsResponse>({
		queryKey: [
			ACCOUNTS_CACHE_KEYS.list,
			params?.group ?? 'all',
			params?.lowbar ? `${String(params.lowbar.amount)}${params.lowbar.currency}` : 'none',
			params?.limit ?? 'default',
			params?.cursor ?? 'first',
		],
		queryFn: () => listAccounts({
			handler: apiContext.accountServers.rest,
			group: params?.group,
			lowbar: params?.lowbar,
			page: { limit: params?.limit, cursor: params?.cursor },
		}),
		...options ?? {},
	});

	return useMemo(() => ({
		...query,
		accounts: query.data?.page.items ?? EMPTY_ACCOUNTS,
		groups: query.data?.groups ?? EMPTY_GROUPS,
		total: query.data?.page.total ?? 0,
		nextCursor: query.data?.page.nextCursor ?? null,
		prevCursor: query.data?.page.prevCursor ?? null,
	}), [query]);
};

export { useAccountsList };
export type { UseAccountsListOptions, UseAccountsListParams, UseAccountsListReturn };
