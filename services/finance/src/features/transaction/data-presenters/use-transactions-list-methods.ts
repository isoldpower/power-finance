import { useMutation, useQuery } from "@tanstack/react-query";
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

const useTransactionsListMethods = (): UseTransactionsReturn => {
	const apiContext = useApiContext();

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