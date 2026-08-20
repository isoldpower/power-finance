import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchTransaction } from "../transactions-api";
import { useApiContext } from "@app/api";
import { CACHE_KEYS } from "./config.ts";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { TransactionDetails, TransactionPosting } from "@entity/transactions";
import type { FetchTransactionResponse } from "../transactions-api";


type UseTransactionOptions = Omit<UseQueryOptions<FetchTransactionResponse>, 'queryKey' | 'queryFn'> & object;

type UseTransactionReturn = UseQueryResult<FetchTransactionResponse> & {
	transaction: TransactionDetails | undefined;
	postings: TransactionPosting[];
};

const useTransaction = (
	id: string,
	options?: UseTransactionOptions
): UseTransactionReturn => {
	const apiContext = useApiContext();
	const query = useQuery<FetchTransactionResponse>({
		queryKey: [CACHE_KEYS.fetch, id],
		queryFn: () => fetchTransaction({
			id,
			handler: apiContext.transactionServers.rest,
		}),
		...options ?? {}
	});

	return useMemo<UseTransactionReturn>(() => ({
		...query,
		transaction: query.data?.transaction,
		postings: query.data?.postings.items ?? [],
	}), [query]);
};

export { useTransaction };
export type { UseTransactionReturn, UseTransactionOptions };
