import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { fetchTransaction } from "../transactions-api";
import { CACHE_KEYS } from "./config.ts";
import type { TransactionPosting } from "@entity/transactions";
import type { FetchTransactionResponse } from "../transactions-api";

type UseTransactionLedgerOptions = Omit<
	UseQueryOptions<FetchTransactionResponse>,
	'queryKey' | 'queryFn'
>;

type UseTransactionLedgerReturn = UseQueryResult<FetchTransactionResponse> & {
	entries: TransactionPosting[];
};

const EMPTY_ENTRIES: TransactionPosting[] = [];

const useTransactionLedger = (
	id: string,
	options?: UseTransactionLedgerOptions
): UseTransactionLedgerReturn => {
	const apiContext = useApiContext();
	const query = useQuery<FetchTransactionResponse>({
		queryKey: [CACHE_KEYS.ledger, id],
		queryFn: () => fetchTransaction({
			handler: apiContext.transactionServers.rest,
			id,
		}),
		enabled: id !== '',
		...options ?? {},
	});

	return useMemo(() => ({
		...query,
		entries: query.data?.postings.items ?? EMPTY_ENTRIES,
	}), [query]);
};

export { useTransactionLedger };
export type { UseTransactionLedgerOptions, UseTransactionLedgerReturn };
