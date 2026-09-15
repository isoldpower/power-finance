import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { createIdempotencyKey } from "@shared/api";
import {
	createTransaction as createTransactionApi,
	createTransactionChain as createTransactionChainApi,
} from "../transactions-api";
import { CACHE_KEYS } from "./config.ts";
import { useOptimisticTransactions } from "./optimistic";

import type { UseMutationResult } from "@tanstack/react-query";
import type { TransactionChainDraft, TransactionDraft } from "@entity/transactions";
import type { CreateTransactionChainResponse, CreateTransactionResponse } from "../transactions-api";
import type { TransactionCachesSnapshot } from "./optimistic";


interface CreateTransactionVariables {
	draft: TransactionDraft;
	idempotencyKey: string;
}

interface CreateTransactionChainVariables {
	draft: TransactionChainDraft;
	idempotencyKey: string;
}

interface CreateTransactionContext {
	snapshot: TransactionCachesSnapshot;
	temporaryIds: string[];
}

interface UseTransactionsReturn {
	meta: {
		createMutation: UseMutationResult<
			CreateTransactionResponse,
			Error,
			CreateTransactionVariables,
			CreateTransactionContext
		>;
		chainMutation: UseMutationResult<
			CreateTransactionChainResponse,
			Error,
			CreateTransactionChainVariables,
			CreateTransactionContext
		>;
	}
	createTransaction: (draft: TransactionDraft) => Promise<CreateTransactionResponse>;
	createTransactionChain: (draft: TransactionChainDraft) => Promise<CreateTransactionChainResponse>;
}

const useTransactionsListMethods = (): UseTransactionsReturn => {
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

	const openDrafts = useCallback(async (
		drafts: TransactionDraft[],
		chained: boolean,
	): Promise<CreateTransactionContext> => {
		const snapshot = await optimistic.capture();
		const projection = optimistic.project({ drafts, chained });
		optimistic.applyCreate(projection.transactions);

		return { snapshot, temporaryIds: projection.temporaryIds };
	}, [optimistic]);

	const createMutation = useMutation<
		CreateTransactionResponse,
		Error,
		CreateTransactionVariables,
		CreateTransactionContext
	>({
		mutationFn: (variables: CreateTransactionVariables) => createTransactionApi({
			draft: variables.draft,
			idempotencyKey: variables.idempotencyKey,
			handler: apiContext.transactionServers.rest
		}),
		mutationKey: [CACHE_KEYS.create],
		onMutate: (variables: CreateTransactionVariables) => openDrafts([variables.draft], false),
		onError: (_error, _variables, context) => {
			optimistic.restore(context?.snapshot);
		},
		onSuccess: (response, _variables, context) => {
			optimistic.applySettledBatch(context.temporaryIds, [response.transaction]);
		},
		onSettled: settleLedger
	});

	const chainMutation = useMutation<
		CreateTransactionChainResponse,
		Error,
		CreateTransactionChainVariables,
		CreateTransactionContext
	>({
		mutationFn: (variables: CreateTransactionChainVariables) => createTransactionChainApi({
			draft: variables.draft,
			idempotencyKey: variables.idempotencyKey,
			handler: apiContext.transactionServers.rest
		}),
		mutationKey: [CACHE_KEYS.chain],
		onMutate: (variables: CreateTransactionChainVariables) => openDrafts(variables.draft.entries, true),
		onError: (_error, _variables, context) => {
			optimistic.restore(context?.snapshot);
		},
		onSuccess: (response, _variables, context) => {
			optimistic.applySettledBatch(context.temporaryIds, response.chain.transactions);
		},
		onSettled: settleLedger
	});

	const createTransaction = useCallback((
		draft: TransactionDraft
	): Promise<CreateTransactionResponse> => {
		return createMutation.mutateAsync({ draft, idempotencyKey: createIdempotencyKey() });
	}, [createMutation]);

	const createTransactionChain = useCallback((
		draft: TransactionChainDraft
	): Promise<CreateTransactionChainResponse> => {
		return chainMutation.mutateAsync({ draft, idempotencyKey: createIdempotencyKey() });
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
export type {
	CreateTransactionChainVariables,
	CreateTransactionContext,
	CreateTransactionVariables,
	UseTransactionsReturn,
};
