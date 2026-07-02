import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { fetchTransaction } from "@feature/transactions";
import { useApiContext } from "@app/api";
import { CACHE_KEYS } from "./config.ts";
import type { TransactionDto } from "@entity/transactions";
import type { FetchTransactionResponse } from "@feature/transactions";

type UseTransactionOptions = Omit<UseQueryOptions<FetchTransactionResponse>, 'queryKey' | 'queryFn'> & {};

type UseTransactionReturn = UseQueryResult<FetchTransactionResponse> & {
	transaction: TransactionDto | undefined;
}

const useTransaction = (
	id: string,
	options?: UseTransactionOptions
): UseTransactionReturn => {
	const apiContext = useApiContext();
	const query = useQuery<FetchTransactionResponse>({
		queryKey: [CACHE_KEYS.fetch, id],
		queryFn: () => fetchTransaction({
			payload: { id },
			handler: apiContext.transactionServers.rest
		}),
		...options ?? {}
	});

	return useMemo<UseTransactionReturn>(() => ({
		...query,
		transaction: query.data
	}), [query]);
}

export { useTransaction };
export type { UseTransactionReturn, UseTransactionOptions };