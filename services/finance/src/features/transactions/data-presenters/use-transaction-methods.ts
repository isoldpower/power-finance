import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { createIdempotencyKey } from "@shared/api";
import {
	adjustTransaction as adjustTransactionApi,
	deleteTransaction as deleteTransactionApi,
	fetchTransaction as fetchTransactionApi,
	updateTransaction as updateTransactionApi,
} from "../transactions-api";
import { CACHE_KEYS } from "./config.ts";
import { useOptimisticTransactions } from "./optimistic";

import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { TransactionPatch } from "@entity/transactions";
import type {
	AdjustTransactionResponse,
	DeleteTransactionResponse,
	FetchTransactionResponse,
	UpdateTransactionResponse,
} from "../transactions-api";
import type { TransactionCachesSnapshot } from "./optimistic";


interface AdjustTransactionVariables {
	amount: string;
	idempotencyKey: string;
}

interface UseTransactionMethodsReturn {
	meta: {
		deleteMutation: UseMutationResult<DeleteTransactionResponse, Error, string, TransactionCachesSnapshot>;
		updateMutation: UseMutationResult<UpdateTransactionResponse, Error, TransactionPatch, TransactionCachesSnapshot>;
		adjustMutation: UseMutationResult<AdjustTransactionResponse, Error, AdjustTransactionVariables, TransactionCachesSnapshot>;
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
	const optimistic = useOptimisticTransactions();
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
		const keys: unknown[][] = [
			[CACHE_KEYS.list],
			[CACHE_KEYS.search],
			[CACHE_KEYS.ledger, id],
			[CACHE_KEYS.fetch, id],
			...DERIVED_KEYS.onLedgerChange.map((key) => [key]),
		];

		for (const queryKey of keys) {
			void client.invalidateQueries({ queryKey });
		}
	}, [client, id]);

	const deleteMutation = useMutation<DeleteTransactionResponse, Error, string, TransactionCachesSnapshot>({
		mutationFn: (transactionId: string) => deleteTransactionApi({
			id: transactionId,
			handler: apiContext.transactionServers.rest
		}),
		mutationKey: [CACHE_KEYS.delete, id],
		onMutate: async (transactionId: string) => {
			const snapshot = await optimistic.capture();
			optimistic.applyRemove(transactionId, new Date().toISOString());

			return snapshot;
		},
		onError: (_error, _transactionId, snapshot) => {
			optimistic.restore(snapshot);
		},
		onSettled: invalidateTransaction
	});

	const fetchTransaction = useCallback(() => {
		return singleQuery.refetch();
	}, [singleQuery]);

	const updateMutation = useMutation<UpdateTransactionResponse, Error, TransactionPatch, TransactionCachesSnapshot>({
		mutationFn: (patch: TransactionPatch) => updateTransactionApi({
			handler: apiContext.transactionServers.rest,
			id,
			patch,
		}),
		mutationKey: [CACHE_KEYS.replace, id],
		onMutate: async (patch: TransactionPatch) => {
			const snapshot = await optimistic.capture();
			optimistic.applyPatch(id, patch);

			return snapshot;
		},
		onError: (_error, _patch, snapshot) => {
			optimistic.restore(snapshot);
		},
		onSuccess: (transaction) => {
			optimistic.applySettled(id, transaction);
		},
		onSettled: invalidateTransaction,
	});

	const adjustMutation = useMutation<AdjustTransactionResponse, Error, AdjustTransactionVariables, TransactionCachesSnapshot>({
		mutationFn: (variables: AdjustTransactionVariables) => adjustTransactionApi({
			handler: apiContext.transactionServers.rest,
			id,
			amount: variables.amount,
			idempotencyKey: variables.idempotencyKey,
		}),
		mutationKey: [CACHE_KEYS.adjust, id],
		onMutate: async (variables: AdjustTransactionVariables) => {
			const snapshot = await optimistic.capture();
			optimistic.applyAdjust(id, variables.amount);

			return snapshot;
		},
		onError: (_error, _variables, snapshot) => {
			optimistic.restore(snapshot);
		},
		onSuccess: (response) => {
			optimistic.applySettled(id, response.transaction);
		},
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
