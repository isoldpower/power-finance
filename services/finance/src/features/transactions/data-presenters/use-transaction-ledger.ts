import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { fetchTransaction } from "../transactions-api";
import { CACHE_KEYS, LEDGER_DISPATCH_POLL_MS, MAX_DISPATCH_POLLS } from "./config.ts";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { TransactionPosting } from "@entity/transactions";
import type { FetchTransactionResponse } from "../transactions-api";


type UseTransactionLedgerOptions = Omit<
	UseQueryOptions<FetchTransactionResponse>,
	'queryKey' | 'queryFn'
>;

type LedgerState = 'ready' | 'dispatching' | 'unavailable';

type UseTransactionLedgerReturn = UseQueryResult<FetchTransactionResponse> & {
	entries: TransactionPosting[];
	ledgerState: LedgerState;
};

const EMPTY_POSTINGS: TransactionPosting[] = [];

const hasNoPostings = (response: FetchTransactionResponse | undefined): boolean => {
	return response !== undefined && response.postings.length === 0;
};

const ledgerStateOf = (
	response: FetchTransactionResponse | undefined,
	dataUpdateCount: number,
): LedgerState => {
	if (!hasNoPostings(response)) return 'ready';

	return dataUpdateCount < MAX_DISPATCH_POLLS ? 'dispatching' : 'unavailable';
};

const useTransactionLedger = (
	id: string,
	options?: UseTransactionLedgerOptions
): UseTransactionLedgerReturn => {
	const apiContext = useApiContext();
	const client = useQueryClient();
	const ledgerKey = [CACHE_KEYS.ledger, id];
	const query = useQuery<FetchTransactionResponse>({
		queryKey: ledgerKey,
		queryFn: () => fetchTransaction({
			handler: apiContext.transactionServers.rest,
			id,
		}),
		enabled: id !== '',
		refetchInterval: (ledgerQuery) => (
			ledgerStateOf(ledgerQuery.state.data, ledgerQuery.state.dataUpdateCount) === 'dispatching'
				? LEDGER_DISPATCH_POLL_MS
				: false
		),
		...options ?? {},
	});

	const polls = client.getQueryState<FetchTransactionResponse>(ledgerKey)?.dataUpdateCount ?? 0;

	return useMemo(() => ({
		...query,
		entries: query.data?.postings ?? EMPTY_POSTINGS,
		ledgerState: ledgerStateOf(query.data, polls),
	}), [query, polls]);
};

export { useTransactionLedger };
export type { LedgerState, UseTransactionLedgerOptions, UseTransactionLedgerReturn };
