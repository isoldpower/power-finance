import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { staleRefetchInterval, useApiContext } from "@app/api";
import { stringifySorted } from "@shared/data";
import { searchTransactions } from "../transactions-api";
import { CACHE_KEYS } from "./config.ts";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { PageParams } from "@shared/api";
import type { Transaction, TransactionQuery } from "@entity/transactions";
import type { SearchTransactionsResponse } from "../transactions-api";


type UseTransactionsSearchParams = PageParams;

type UseTransactionsSearchOptions = Omit<
	UseQueryOptions<SearchTransactionsResponse>,
	'queryKey' | 'queryFn'
>;

type UseTransactionsSearchReturn = UseQueryResult<SearchTransactionsResponse> & {
	transactions: Transaction[];
	total: number;
	nextCursor: string | null;
	prevCursor: string | null;
};

const EMPTY_TRANSACTIONS: Transaction[] = [];

const useTransactionsSearch = (
	query: TransactionQuery,
	params?: UseTransactionsSearchParams,
	options?: UseTransactionsSearchOptions
): UseTransactionsSearchReturn => {
	const apiContext = useApiContext();
	const searchQuery = useQuery<SearchTransactionsResponse>({
		queryKey: [
			CACHE_KEYS.search,
			stringifySorted(query),
			params?.limit ?? 'default',
			params?.cursor ?? 'first',
		],
		queryFn: () => searchTransactions({
			handler: apiContext.transactionServers.rest,
			query,
			page: { limit: params?.limit, cursor: params?.cursor },
		}),
		refetchInterval: (searchQuery) => staleRefetchInterval(searchQuery.state.error),
		...options ?? {},
	});

	return useMemo(() => ({
		...searchQuery,
		transactions: searchQuery.data?.page.items ?? EMPTY_TRANSACTIONS,
		total: searchQuery.data?.page.total ?? 0,
		nextCursor: searchQuery.data?.page.nextCursor ?? null,
		prevCursor: searchQuery.data?.page.prevCursor ?? null,
	}), [searchQuery]);
};

export { useTransactionsSearch };
export type { UseTransactionsSearchParams, UseTransactionsSearchOptions, UseTransactionsSearchReturn };
