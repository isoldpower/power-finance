import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import {
	createTransaction as createTransactionApi,
	listAllTransactions as listAllTransactionsApi
} from "@feature/transaction";
import { CACHE_KEYS } from "./config.ts";
import type {
	CreateTransactionRequest,
	CreateTransactionResponse,
	TransactionMinimalPayload,
	ListAllTransactionsResponse
} from "@feature/transaction";

interface UseTransactionsReturn {
	meta: {
		query: UseQueryResult<ListAllTransactionsResponse>;
		createMutation: UseMutationResult<CreateTransactionResponse, Error, CreateTransactionRequest['payload']>;
	}
	createTransaction: (data: TransactionMinimalPayload) => void;
	fetchAllTransactions: () => void;
}

// Posting a transaction changes balances, so re-fetch every query derived from the
// ledger: the wallets list and the summary insights/ledger-balance (cache keys mirrored
// from those features). Same refetch-on-mutation pattern used for the transaction list.
const DERIVED_KEYS = ['wallets', 'summary-insights', 'summary-ledger-balance'];

const useTransactionsListMethods = (): UseTransactionsReturn => {
	const apiContext = useApiContext();
	const client = useQueryClient();

	const query = useQuery({
		queryKey: [CACHE_KEYS.list],
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		queryFn: () => listAllTransactionsApi({
			handler: apiContext.transactionServers.rest
		})
	});

	const createMutation = useMutation({
		mutationFn: (data: CreateTransactionRequest['payload']) => createTransactionApi({
			payload: data,
			handler: apiContext.transactionServers.rest
		}),
		mutationKey: [CACHE_KEYS.create],
		onSettled: () => {
			query.refetch().catch((err: unknown) => {
				console.error(err)
			});
			for (const key of DERIVED_KEYS) {
				void client.invalidateQueries({ queryKey: [key] });
			}
		}
	});

	const createTransaction = useCallback((
		data: TransactionMinimalPayload
	) => {
		createMutation.mutate({ data });
	}, [createMutation]);

	const fetchAllTransactions = useCallback(() => {
		return query.refetch();
	}, [query]);

	const meta = useMemo(() => ({
		createMutation,
		query
	}), [createMutation, query]);

	return useMemo(() => ({
		createTransaction,
		fetchAllTransactions,
		meta
	}), [meta, createTransaction, fetchAllTransactions]);
}

export { useTransactionsListMethods };
export type { UseTransactionsReturn };