import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { listTransactions } from "../transactions-api";
import { CACHE_KEYS } from "./config.ts";
import type { PageParams } from "@shared/api";
import type { Transaction } from "@entity/transactions";
import type { ListTransactionsResponse } from "../transactions-api";

type UseTransactionsListParams = PageParams;

type UseTransactionsListOptions = Omit<
	UseQueryOptions<ListTransactionsResponse>,
	'queryKey' | 'queryFn'
> & object;

type UseTransactionsListReturn = UseQueryResult<ListTransactionsResponse> & {
	transactions: Transaction[];
	total: number;
	nextCursor: string | null;
	prevCursor: string | null;
};

const EMPTY_TRANSACTIONS: Transaction[] = [];

const useTransactionsList = (
	params?: UseTransactionsListParams,
	options?: UseTransactionsListOptions
): UseTransactionsListReturn => {
	const apiContext = useApiContext();
	const query = useQuery<ListTransactionsResponse>({
		queryKey: [CACHE_KEYS.list, params?.limit ?? 'default', params?.cursor ?? 'first'],
		queryFn: () => listTransactions({
			handler: apiContext.transactionServers.rest,
			page: params,
		}),
		...options ?? {}
	});

	return useMemo(() => ({
		...query,
		transactions: query.data?.page.items ?? EMPTY_TRANSACTIONS,
		total: query.data?.page.total ?? 0,
		nextCursor: query.data?.page.nextCursor ?? null,
		prevCursor: query.data?.page.prevCursor ?? null,
	}), [query]);
};

export { useTransactionsList };
export type { UseTransactionsListReturn, UseTransactionsListOptions, UseTransactionsListParams };
