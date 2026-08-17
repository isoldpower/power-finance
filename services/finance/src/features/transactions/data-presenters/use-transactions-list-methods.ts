import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { UseMutationResult } from "@tanstack/react-query";

import { useApiContext, DERIVED_KEYS } from "@app/api";
import {
	createTransaction as createTransactionApi,
	createTransactionChain as createTransactionChainApi,
} from "../transactions-api";
import { CACHE_KEYS } from "./config.ts";
import type { TransactionChainDraft, TransactionDraft } from "@entity/transactions";
import type { CreateTransactionChainResponse, CreateTransactionResponse } from "../transactions-api";

interface UseTransactionsReturn {
	meta: {
		createMutation: UseMutationResult<CreateTransactionResponse, Error, TransactionDraft>;
		chainMutation: UseMutationResult<CreateTransactionChainResponse, Error, TransactionChainDraft>;
	}
	createTransaction: (draft: TransactionDraft) => Promise<CreateTransactionResponse>;
	createTransactionChain: (draft: TransactionChainDraft) => Promise<CreateTransactionChainResponse>;
}

const useTransactionsListMethods = (): UseTransactionsReturn => {
	const apiContext = useApiContext();
	const client = useQueryClient();

	const settleLedger = useCallback(() => {
		void client.invalidateQueries({ queryKey: [CACHE_KEYS.list] });
		void client.invalidateQueries({ queryKey: [CACHE_KEYS.search] });
		for (const key of DERIVED_KEYS.onLedgerChange) {
			void client.invalidateQueries({ queryKey: [key] });
		}
	}, [client]);

	const createMutation = useMutation({
		mutationFn: (draft: TransactionDraft) => createTransactionApi({
			draft,
			handler: apiContext.transactionServers.rest
		}),
		mutationKey: [CACHE_KEYS.create],
		onSettled: settleLedger
	});

	const chainMutation = useMutation({
		mutationFn: (draft: TransactionChainDraft) => createTransactionChainApi({
			draft,
			handler: apiContext.transactionServers.rest
		}),
		mutationKey: [CACHE_KEYS.chain],
		onSettled: settleLedger
	});

	const createTransaction = useCallback((
		draft: TransactionDraft
	): Promise<CreateTransactionResponse> => {
		return createMutation.mutateAsync(draft);
	}, [createMutation]);

	const createTransactionChain = useCallback((
		draft: TransactionChainDraft
	): Promise<CreateTransactionChainResponse> => {
		return chainMutation.mutateAsync(draft);
	}, [chainMutation]);

	const meta = useMemo(() => ({
		createMutation,
		chainMutation,
	}), [createMutation, chainMutation]);

	return useMemo(() => ({
		createTransaction,
		createTransactionChain,
		meta
	}), [meta, createTransaction, createTransactionChain]);
};

export { useTransactionsListMethods };
export type { UseTransactionsReturn };
