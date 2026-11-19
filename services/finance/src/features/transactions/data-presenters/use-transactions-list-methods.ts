import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { createIdempotencyKey } from "@internal/shared";
import {
	createTransaction as createTransactionApi,
	createTransactionAdjustment as createTransactionAdjustmentApi,
	createTransactionChain as createTransactionChainApi,
} from "../transactions-api";
import { CACHE_KEYS } from "./config.ts";
import { optimisticTransactionId, useOptimisticTransactions } from "./optimistic";

import type { UseMutationResult } from "@tanstack/react-query";
import type { Transaction, TransactionChainDraft, TransactionDraft } from "@entity/transactions";
import type {
	CreateTransactionAdjustmentResponse,
	CreateTransactionChainResponse,
	CreateTransactionResponse,
} from "../transactions-api";
import type { TransactionCachesSnapshot } from "./optimistic";


interface CreateTransactionVariables {
	draft: TransactionDraft;
	idempotencyKey: string;
}

interface CreateTransactionChainVariables {
	draft: TransactionChainDraft;
	idempotencyKey: string;
}

interface CreateAdjustmentVariables {
	adjusted: Transaction;
	draft: TransactionDraft;
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
		adjustmentMutation: UseMutationResult<
			CreateTransactionAdjustmentResponse,
			Error,
			CreateAdjustmentVariables,
			CreateTransactionContext
		>;
	}
	createTransaction: (draft: TransactionDraft) => Promise<CreateTransactionResponse>;
	createTransactionChain: (draft: TransactionChainDraft) => Promise<CreateTransactionChainResponse>;
	createAdjustment: (adjusted: Transaction, draft: TransactionDraft) => Promise<CreateTransactionAdjustmentResponse>;
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

	const adjustmentMutation = useMutation<
		CreateTransactionAdjustmentResponse,
		Error,
		CreateAdjustmentVariables,
		CreateTransactionContext
	>({
		mutationFn: (variables: CreateAdjustmentVariables) => createTransactionAdjustmentApi({
			adjusted: variables.adjusted,
			draft: variables.draft,
			idempotencyKey: variables.idempotencyKey,
			handler: apiContext.transactionServers.rest
		}),
		mutationKey: [CACHE_KEYS.adjustment],
		onMutate: async ({ adjusted, draft }: CreateAdjustmentVariables) => {
			const snapshot = await optimistic.capture();
			const chain = {
				id: adjusted.chain?.id ?? optimisticTransactionId(),
				size: (adjusted.chain?.size ?? 1) + 1,
			};
			const projection = optimistic.project({ drafts: [draft], chained: false });
			optimistic.applyChain([adjusted.id], chain);
			optimistic.applyCreate(projection.transactions.map((transaction) => ({ ...transaction, chain })));

			return { snapshot, temporaryIds: projection.temporaryIds };
		},
		onError: (_error, _variables, context) => {
			optimistic.restore(context?.snapshot);
		},
		onSuccess: (response, _variables, context) => {
			const members = response.chain.transactions;
			const created = members.at(-1);

			for (const member of members.slice(0, -1)) {
				optimistic.applySettled(member.id, member);
			}
			optimistic.applySettledBatch(context.temporaryIds, created ? [created] : []);
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

	const createAdjustment = useCallback((
		adjusted: Transaction,
		draft: TransactionDraft
	): Promise<CreateTransactionAdjustmentResponse> => {
		return adjustmentMutation.mutateAsync({ adjusted, draft, idempotencyKey: createIdempotencyKey() });
	}, [adjustmentMutation]);

	const meta = useMemo(() => ({
		createMutation,
		chainMutation,
		adjustmentMutation,
	}), [createMutation, chainMutation, adjustmentMutation]);

	return useMemo(() => ({
		createTransaction,
		createTransactionChain,
		createAdjustment,
		meta
	}), [meta, createTransaction, createTransactionChain, createAdjustment]);
};

export { useTransactionsListMethods };
export type {
	CreateAdjustmentVariables,
	CreateTransactionChainVariables,
	CreateTransactionContext,
	CreateTransactionVariables,
	UseTransactionsReturn,
};
