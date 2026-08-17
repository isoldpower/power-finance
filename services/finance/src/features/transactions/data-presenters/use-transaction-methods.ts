import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import {
	deleteTransaction as deleteTransactionApi,
	fetchTransaction as fetchTransactionApi,
	updateTransaction as updateTransactionApi,
} from "../transactions-api";
import { CACHE_KEYS } from "./config.ts";
import type { TransactionPatch } from "@entity/transactions";
import type {
	DeleteTransactionResponse,
	FetchTransactionResponse,
	UpdateTransactionResponse,
} from "../transactions-api";

interface UseTransactionMethodsReturn {
	meta: {
		deleteMutation: UseMutationResult<DeleteTransactionResponse, Error, string>;
		updateMutation: UseMutationResult<UpdateTransactionResponse, Error, TransactionPatch>;
		query: UseQueryResult<FetchTransactionResponse>;
	}
	deleteTransaction: () => void;
	updateTransaction: (patch: TransactionPatch) => Promise<UpdateTransactionResponse>;
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
			id,
			handler: apiContext.transactionServers.rest
		})
	});

	const invalidateTransaction = useCallback(() => {
		void client.invalidateQueries({ queryKey: [CACHE_KEYS.list] });
		void client.invalidateQueries({ queryKey: [CACHE_KEYS.search] });
		void client.invalidateQueries({ queryKey: [CACHE_KEYS.ledger, id] });
		void client.invalidateQueries({ queryKey: [CACHE_KEYS.fetch, id] });
	}, [client, id]);

	const deleteMutation = useMutation({
		mutationFn: (transactionId: string) => deleteTransactionApi({
			id: transactionId,
			handler: apiContext.transactionServers.rest
		}),
		mutationKey: [CACHE_KEYS.delete, id],
		onSettled: invalidateTransaction
	});

	const fetchTransaction = useCallback(() => {
		return singleQuery.refetch();
	}, [singleQuery]);

	const updateMutation = useMutation({
		mutationFn: (patch: TransactionPatch) => updateTransactionApi({
			handler: apiContext.transactionServers.rest,
			id,
			patch,
		}),
		mutationKey: [CACHE_KEYS.replace, id],
		onSettled: invalidateTransaction,
	});

	const updateTransaction = useCallback((patch: TransactionPatch) => {
		return updateMutation.mutateAsync(patch);
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
};

export { useTransactionMethods };
export type { UseTransactionMethodsReturn };
