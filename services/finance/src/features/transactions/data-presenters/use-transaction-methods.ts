// @reserved-api - wired to the API and intentionally not consumed yet; awaiting post-MVP flows. NOT dead code: do not delete, do not drop from barrels.
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback , useMemo } from "react";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import { deleteTransaction as deleteTransactionApi } from "../transactions-api/methods/delete-transaction.ts";
import { fetchTransaction as fetchTransactionApi } from "../transactions-api/methods/fetch-transaction.ts";
import { updateTransaction as updateTransactionApi } from "../transactions-api/methods/update-transaction.ts";
import { useApiContext } from "@app/api";
import { CACHE_KEYS } from "./config.ts";
import type { FetchTransactionResponse } from "../transactions-api/methods/fetch-transaction.ts";
import type { DeleteTransactionRequest, DeleteTransactionResponse } from "../transactions-api/methods/delete-transaction.ts";
import type { UpdateTransactionResponse } from "../transactions-api/methods/update-transaction.ts";
import type { ListAllTransactionsResponse } from "../transactions-api/methods/list-all-transactions.ts";
import type { TransactionPatchFields } from "../transactions-api/types.ts";


interface UseTransactionMethodsReturn {
	meta: {
		deleteMutation: UseMutationResult<DeleteTransactionResponse, Error, string>;
		updateMutation: UseMutationResult<UpdateTransactionResponse, Error, TransactionPatchFields>;
		query: UseQueryResult<FetchTransactionResponse>;
	}
	deleteTransaction: () => void;
	updateTransaction: (data: TransactionPatchFields) => Promise<UpdateTransactionResponse>;
	fetchTransaction: () => void;
}

const useTransactionMethods = (
	id: string
): UseTransactionMethodsReturn => {
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

	// USED FOR PATCH/PUT REQUESTS AS OPTIMISTIC UPDATES.
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

	const updateMutation = useMutation({
		mutationFn: (data: TransactionPatchFields) => updateTransactionApi({
			handler: apiContext.transactionServers.rest,
			payload: { id, data },
		}),
		mutationKey: [CACHE_KEYS.replace, id],
		onSuccess: () => {
			void client.invalidateQueries({ queryKey: [CACHE_KEYS.list] });
			void client.invalidateQueries({ queryKey: [CACHE_KEYS.fetch, id] });
		},
	});

	const updateTransaction = useCallback((data: TransactionPatchFields) => {
		return updateMutation.mutateAsync(data);
	}, [updateMutation]);

	const deleteTransaction = useCallback(() => {
		deleteMutation.mutate(id);
	}, [deleteMutation, id]);

	const meta = useMemo(() => ({
		deleteMutation,
		updateMutation,
		query: singleQuery
	}), [singleQuery, deleteMutation, updateMutation]);

	return useMemo(() => ({
		meta,
		deleteTransaction,
		updateTransaction,
		fetchTransaction,
	}), [meta, fetchTransaction, deleteTransaction, updateTransaction]);
}

export { useTransactionMethods };
export type { UseTransactionMethodsReturn };