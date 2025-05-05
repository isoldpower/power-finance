import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { fetchTransaction } from "@feature/transaction";
import { useApiContext } from "@app/api";
import { CACHE_KEYS } from "./config.ts";
import type { Transaction } from "@entity/transaction";
import type { FetchTransactionResponse } from "@feature/transaction";

type UseTransactionOptions = Omit<UseQueryOptions<FetchTransactionResponse>, 'queryKey' | 'queryFn'> & {};

type UseTransactionReturn = UseQueryResult & {
	transaction: Transaction | undefined;
}

const useTransaction = (
	id: string,
	options?: UseTransactionOptions
): UseTransactionReturn  => {
	const apiContext = useApiContext();
	const query = useQuery<FetchTransactionResponse>({
		queryKey: [CACHE_KEYS.fetch, id],
		queryFn: () => fetchTransaction({
			payload: { id },
			handler: apiContext.transactionsClients.rest
		}),
		...options ?? {}
	});

	return useMemo(() => ({
		...query,
		transaction: query?.data
	}), [query]);
}

export { useTransaction };
export type { UseTransactionReturn, UseTransactionOptions };