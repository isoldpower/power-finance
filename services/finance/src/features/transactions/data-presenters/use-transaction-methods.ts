import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useApiContext } from "@app/api";
import { createIdempotencyKey } from "@shared/api";
import {
	adjustTransaction as adjustTransactionApi,
	deleteTransaction as deleteTransactionApi,
	fetchTransaction as fetchTransactionApi,
	updateTransaction as updateTransactionApi,
} from "../transactions-api";
import { CACHE_KEYS } from "./config.ts";

import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { TransactionPatch } from "@entity/transactions";
import type {
	AdjustTransactionResponse,
	DeleteTransactionResponse,
	FetchTransactionResponse,
	UpdateTransactionResponse,
} from "../transactions-api";


interface AdjustTransactionVariables {
	amount: string;
	idempotencyKey: string;
}

interface UseTransactionMethodsReturn {
	meta: {
		deleteMutation: UseMutationResult<DeleteTransactionResponse, Error, string>;
		updateMutation: UseMutationResult<UpdateTransactionResponse, Error, TransactionPatch>;
		adjustMutation: UseMutationResult<AdjustTransactionResponse, Error, AdjustTransactionVariables>;
		query: UseQueryResult<FetchTransactionResponse>;
	}
	deleteTransaction: () => void;
	updateTransaction: (patch: TransactionPatch) => Promise<UpdateTransactionResponse>;
	adjustTransaction: (amount: string) => Promise<AdjustTransactionResponse>;
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
		[
			[CACHE_KEYS.list],
			[CACHE_KEYS.search],
			[CACHE_KEYS.ledger, id],
			[CACHE_KEYS.fetch, id],
		].map((keys) => {
			void client.invalidateQueries({ queryKey: keys });
		})
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

	const adjustMutation = useMutation({
		mutationFn: (variables: AdjustTransactionVariables) => adjustTransactionApi({
			handler: apiContext.transactionServers.rest,
			id,
			amount: variables.amount,
			idempotencyKey: variables.idempotencyKey,
		}),
		mutationKey: [CACHE_KEYS.adjust, id],
		onSettled: invalidateTransaction,
	});

	const adjustTransaction = useCallback((amount: string) => {
		return adjustMutation.mutateAsync({ amount, idempotencyKey: createIdempotencyKey() });
	}, [adjustMutation]);

	const updateTransaction = useCallback((patch: TransactionPatch) => {
		return updateMutation.mutateAsync(patch);
	}, [updateMutation]);

	const deleteTransaction = useCallback(() => {
		deleteMutation.mutate(id);
	}, [deleteMutation, id]);

	const meta = useMemo(() => ({
		deleteMutation,
		updateMutation,
		adjustMutation,
		query: singleQuery
	}), [singleQuery, deleteMutation, updateMutation, adjustMutation]);

	return useMemo(() => ({
		meta,
		deleteTransaction,
		updateTransaction,
		adjustTransaction,
		fetchTransaction,
	}), [meta, fetchTransaction, deleteTransaction, updateTransaction, adjustTransaction]);
};

export { useTransactionMethods };
export type { AdjustTransactionVariables, UseTransactionMethodsReturn };
