import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { listAllTransactions } from "@feature/transaction";
import { useApiContext } from "@app/api";
import { CACHE_KEYS } from "./config.ts";
import type { Transaction } from "@entity/transaction";
import type { ListAllTransactionsResponse } from "@feature/transaction";

type UseTransactionsListOptions = Omit<
	UseQueryOptions<ListAllTransactionsResponse>,
	'queryKey' | 'queryFn'
> & {};

type UseTransactionsListReturn = UseQueryResult & {
	transactions: Transaction[];
}

const useTransactionsList = (
	options?: UseTransactionsListOptions
): UseTransactionsListReturn  => {
	const apiContext = useApiContext();
	const query = useQuery<ListAllTransactionsResponse>({
		queryKey: [CACHE_KEYS.list],
		queryFn: () => listAllTransactions({
			handler: apiContext.transactionsClients.rest
		}),
		...options ?? {}
	});

	return useMemo(() => ({
		...query,
		transactions: query?.data?.data ?? []
	}), [query]);
}

export { useTransactionsList };
export type { UseTransactionsListReturn, UseTransactionsListOptions };