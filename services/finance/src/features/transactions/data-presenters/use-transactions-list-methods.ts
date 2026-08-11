import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import { useApiContext, DERIVED_KEYS } from "@app/api";
import { createTransaction as createTransactionApi } from "../transactions-api/methods/create-transaction.ts";
import { createTransactionChain as createTransactionChainApi } from "../transactions-api/methods/create-transaction-chain.ts";
import { listAllTransactions as listAllTransactionsApi } from "../transactions-api/methods/list-all-transactions.ts";
import { CACHE_KEYS } from "./config.ts";
import type { CreateTransactionRequest, CreateTransactionResponse } from "../transactions-api/methods/create-transaction.ts";
import type { CreateTransactionChainResponse } from "../transactions-api/methods/create-transaction-chain.ts";
import type { TransactionMinimalPayload, TransactionChainPayload } from "../transactions-api/types.ts";
import type { ListAllTransactionsResponse } from "../transactions-api/methods/list-all-transactions.ts";


interface UseTransactionsReturn {
	meta: {
		query: UseQueryResult<ListAllTransactionsResponse>;
		createMutation: UseMutationResult<CreateTransactionResponse, Error, CreateTransactionRequest['payload']>;
		chainMutation: UseMutationResult<CreateTransactionChainResponse, Error, TransactionChainPayload>;
	}
	createTransaction: (data: TransactionMinimalPayload) => Promise<CreateTransactionResponse>;
	createTransactionChain: (data: TransactionChainPayload) => Promise<CreateTransactionChainResponse>;
	fetchAllTransactions: () => Promise<ListAllTransactionsResponse | undefined>;
}

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

	const settleLedger = useCallback(() => {
		query.refetch().catch((err: unknown) => {
			console.error(err)
		});
		for (const key of DERIVED_KEYS.onLedgerChange) {
			void client.invalidateQueries({ queryKey: [key] });
		}
	}, [query, client]);

	const createMutation = useMutation({
		mutationFn: (data: CreateTransactionRequest['payload']) => createTransactionApi({
			payload: data,
			handler: apiContext.transactionServers.rest
		}),
		mutationKey: [CACHE_KEYS.create],
		onSettled: settleLedger
	});

	const chainMutation = useMutation({
		mutationFn: (data: TransactionChainPayload) => createTransactionChainApi({
			payload: { data },
			handler: apiContext.transactionServers.rest
		}),
		mutationKey: [CACHE_KEYS.chain],
		onSettled: settleLedger
	});

	const createTransaction = useCallback((
		data: TransactionMinimalPayload
	): Promise<CreateTransactionResponse> => {
		return createMutation.mutateAsync({ data });
	}, [createMutation]);

	const createTransactionChain = useCallback((
		data: TransactionChainPayload
	): Promise<CreateTransactionChainResponse> => {
		return chainMutation.mutateAsync(data);
	}, [chainMutation]);

	const fetchAllTransactions = useCallback(() => {
		return query.refetch()
			.then((response) => response.data);
	}, [query]);

	const meta = useMemo(() => ({
		createMutation,
		chainMutation,
		query
	}), [createMutation, chainMutation, query]);

	return useMemo(() => ({
		createTransaction,
		createTransactionChain,
		fetchAllTransactions,
		meta
	}), [meta, createTransaction, createTransactionChain, fetchAllTransactions]);
}

export { useTransactionsListMethods };
export type { UseTransactionsReturn };