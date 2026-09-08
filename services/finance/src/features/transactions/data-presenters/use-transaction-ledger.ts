import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { fetchTransaction } from "../transactions-api";
import { CACHE_KEYS, LEDGER_DISPATCH_POLL_MS } from "./config.ts";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { TransactionPosting } from "@entity/transactions";
import type { FetchTransactionResponse } from "../transactions-api";


type UseTransactionLedgerOptions = Omit<
	UseQueryOptions<FetchTransactionResponse>,
	'queryKey' | 'queryFn'
>;

type UseTransactionLedgerReturn = UseQueryResult<FetchTransactionResponse> & {
	entries: TransactionPosting[];
	dispatching: boolean;
};

const EMPTY_POSTINGS: TransactionPosting[] = [];

const isDispatching = (response: FetchTransactionResponse | undefined): boolean => {
	return response !== undefined && response.postings.length === 0;
};

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
		refetchInterval: (ledgerQuery) => (
			isDispatching(ledgerQuery.state.data) ? LEDGER_DISPATCH_POLL_MS : false
		),
		...options ?? {},
	});

	return useMemo(() => ({
		...query,
		entries: query.data?.postings ?? EMPTY_POSTINGS,
		dispatching: isDispatching(query.data),
	}), [query]);
};

export { useTransactionLedger };
export type { UseTransactionLedgerOptions, UseTransactionLedgerReturn };
