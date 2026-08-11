import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { listAllTransactions } from "../transactions-api/methods/list-all-transactions.ts";
import { useApiContext } from "@app/api";
import { CACHE_KEYS } from "./config.ts";
import type { TransactionPreviewDto } from "@entity/transactions";
import type { ListAllTransactionsResponse } from "../transactions-api/methods/list-all-transactions.ts";

type UseTransactionsListOptions = Omit<
	UseQueryOptions<ListAllTransactionsResponse>,
	'queryKey' | 'queryFn'
> & {};

type UseTransactionsListReturn = UseQueryResult & {
	transactions: TransactionPreviewDto[];
}

const useTransactionsList = (
	options?: UseTransactionsListOptions
): UseTransactionsListReturn  => {
	const apiContext = useApiContext();
	const query = useQuery<ListAllTransactionsResponse>({
		queryKey: [CACHE_KEYS.list],
		queryFn: () => listAllTransactions({
			handler: apiContext.transactionServers.rest
		}),
		...options ?? {}
	});

	return useMemo(() => ({
		...query,
		transactions: query.data?.data ?? []
	}), [query]);
}

export { useTransactionsList };
export type { UseTransactionsListReturn, UseTransactionsListOptions };