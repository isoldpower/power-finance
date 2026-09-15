import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { deleteTransaction as deleteTransactionApi } from "../transactions-api";
import { CACHE_KEYS } from "./config.ts";
import { useOptimisticTransactions } from "./optimistic";

import type { UseMutationResult } from "@tanstack/react-query";
import type { DeleteTransactionResponse } from "../transactions-api";
import type { TransactionCachesSnapshot } from "./optimistic";


interface UseDeleteTransactionsReturn {
	deleteTransactions: (ids: string[], onDeleted?: () => void) => void;
	mutation: UseMutationResult<
		DeleteTransactionResponse[],
		Error,
		string[],
		TransactionCachesSnapshot
	>;
	isPending: boolean;
}

const isFulfilled = <TValue>(
	result: PromiseSettledResult<TValue>
): result is PromiseFulfilledResult<TValue> => result.status === 'fulfilled';

const useDeleteTransactions = (): UseDeleteTransactionsReturn => {
	const apiContext = useApiContext();
	const client = useQueryClient();
	const optimistic = useOptimisticTransactions();

	const settleLedger = useCallback(() => {
		void client.invalidateQueries({ queryKey: [CACHE_KEYS.list] });
		void client.invalidateQueries({ queryKey: [CACHE_KEYS.search] });
		for (const key of DERIVED_KEYS.onLedgerChange) {
			void client.invalidateQueries({ queryKey: [key] });
		}
	}, [client]);

	const mutation = useMutation<
		DeleteTransactionResponse[],
		Error,
		string[],
		TransactionCachesSnapshot
	>({
		mutationKey: [CACHE_KEYS.delete],
		mutationFn: async (ids: string[]) => {
			const settled = await Promise.allSettled(ids.map((id) => deleteTransactionApi({
				id,
				handler: apiContext.transactionServers.rest,
			})));
			const rejected = settled.length - settled.filter(isFulfilled).length;

			if (rejected > 0) {
				throw new Error(
					`Could not delete ${String(rejected)} of ${String(ids.length)} transactions`
				);
			}

			return settled.filter(isFulfilled).map((result) => result.value);
		},
		onMutate: async (ids: string[]) => {
			const snapshot = await optimistic.capture();
			optimistic.applyRemoveBatch(ids, new Date().toISOString());

			return snapshot;
		},
		onError: (_error, _ids, snapshot) => {
			optimistic.restore(snapshot);
		},
		onSettled: settleLedger,
	});

	const deleteTransactions = useCallback((ids: string[], onDeleted?: () => void) => {
		if (ids.length === 0) return;

		mutation.mutate(ids, { onSuccess: () => { onDeleted?.(); } });
	}, [mutation]);

	return useMemo(() => ({
		deleteTransactions,
		mutation,
		isPending: mutation.isPending,
	}), [deleteTransactions, mutation]);
};

export { useDeleteTransactions };
export type { UseDeleteTransactionsReturn };
