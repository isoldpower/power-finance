import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback , useMemo } from "react";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import {
	deleteTransaction as deleteTransactionApi,
	fetchTransaction as fetchTransactionApi,
} from "@feature/transaction";
import { useApiContext } from "@app/api";
import { CACHE_KEYS } from "./config.ts";
import type {
	FetchTransactionResponse,
	DeleteTransactionRequest, DeleteTransactionResponse,
	ListAllTransactionsResponse
} from "@feature/transaction";


interface UseTransactionReturn {
	meta: {
		deleteMutation: UseMutationResult<DeleteTransactionResponse, Error, string>;
		query: UseQueryResult<FetchTransactionResponse>;
	}
	deleteTransaction: () => void;
	fetchTransaction: () => void;
}

const useTransactionMethods = (
	id: string
): UseTransactionReturn => {
	const apiContext = useApiContext();
	const client = useQueryClient();
	const singleQuery = useQuery({
		queryKey: [CACHE_KEYS.fetch, id],
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		queryFn: () => fetchTransactionApi({
			payload: { id },
			handler: apiContext.transactionServers.rest
		})
	});

	// const synchronizeList = useCallback((
	// 	data: FetchTransactionResponse | undefined
	// ) => {
	// 	if (!data) return;
	//
	// 	client.setQueryData([CACHE_KEYS.list], (oldData: ListAllTransactionsResponse | undefined) => {
	// 		if (!oldData) return [];
	//
	// 		return {
	// 			data: oldData.data.map((transaction) => transaction.id === data.id ? data : transaction),
	// 			meta: oldData.meta
	// 		};
	// 	})
	// }, [client]);

	const filterList = useCallback((
		data: FetchTransactionResponse | undefined
	) => {
		if (!data) return;

		client.setQueryData([CACHE_KEYS.list], (oldData: ListAllTransactionsResponse | undefined) => {
			if (!oldData) return [];

			return {
				data: oldData.data.filter((transaction) => transaction.id !== data.id),
				meta: {
					...oldData.meta,
					total: oldData.meta.total - 1
				}
			};
		})
	}, [client]);

	const deleteMutation = useMutation({
		mutationFn: (id: DeleteTransactionRequest['id']) => deleteTransactionApi({
			id,
			handler: apiContext.transactionServers.rest
		}),
		mutationKey: [CACHE_KEYS.delete, id],
		onSettled: () => { filterList(singleQuery.data); }
	});
	
	const fetchTransaction = useCallback(() => {
		return singleQuery.refetch();
	}, [singleQuery]);

	const deleteTransaction = useCallback(() => {
		deleteMutation.mutate(id);
	}, [deleteMutation, id]);

	const meta = useMemo(() => ({
		deleteMutation,
		query: singleQuery
	}), [singleQuery, deleteMutation, ]);

	return useMemo(() => ({
		meta,
		deleteTransaction,
		fetchTransaction,
	}), [meta, fetchTransaction, deleteTransaction]);
}

export { useTransactionMethods };
export type { UseTransactionReturn };