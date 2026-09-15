import { useCallback, useMemo } from "react";
import { useOptimisticCache } from "@shared/data";

import { optimisticTransactionId, transactionFromDraft } from "./draft-transaction.ts";
import {
	adjustTransactionAmount,
	patchTransaction,
	patchTransactionDetails,
} from "./patch-transaction.ts";
import { TRANSACTION_RESOURCE } from "./resource.ts";
import { readWalletRef } from "./wallet-ref.ts";

import type { Transaction, TransactionDraft, TransactionPatch } from "@entity/transactions";
import type { TransactionCachesSnapshot } from "./types.ts";


interface OptimisticDraftInput {
	drafts: TransactionDraft[];
	chained: boolean;
}

interface OptimisticDraftResult {
	transactions: Transaction[];
	temporaryIds: string[];
}

interface UseOptimisticTransactionsReturn {
	capture: () => Promise<TransactionCachesSnapshot>;
	restore: (snapshot: TransactionCachesSnapshot | undefined) => void;
	project: (input: OptimisticDraftInput) => OptimisticDraftResult;
	applyPatch: (id: string, patch: TransactionPatch) => void;
	applyAdjust: (id: string, amount: string) => void;
	applyCreate: (transactions: Transaction[]) => void;
	applyRemove: (id: string, cancelledAt: string) => void;
	applyRemoveBatch: (ids: string[], cancelledAt: string) => void;
	applySettled: (id: string, transaction: Transaction) => void;
	applySettledBatch: (temporaryIds: string[], transactions: Transaction[]) => void;
}

const useOptimisticTransactions = (): UseOptimisticTransactionsReturn => {
	const cache = useOptimisticCache(TRANSACTION_RESOURCE);
	const { client } = cache;

	const project = useCallback((input: OptimisticDraftInput): OptimisticDraftResult => {
		const createdAt = new Date().toISOString();
		const chain = input.chained
			? { id: optimisticTransactionId(), size: input.drafts.length }
			: null;
		const transactions = input.drafts.map((draft) => transactionFromDraft({
			draft,
			chain,
			createdAt,
			id: optimisticTransactionId(),
			wallet: readWalletRef(client, draft.walletId),
		}));

		return { transactions, temporaryIds: transactions.map((transaction) => transaction.id) };
	}, [client]);

	const applyPatch = useCallback((id: string, patch: TransactionPatch): void => {
		cache.patchPaged(id, (transaction) => patchTransaction(transaction, patch));
		cache.patchDetails(id, (transaction) => patchTransactionDetails(transaction, patch));
	}, [cache]);

	const applyAdjust = useCallback((id: string, amount: string): void => {
		cache.patchPaged(id, (transaction) => adjustTransactionAmount(transaction, amount));
		cache.patchDetails(id, (transaction) => adjustTransactionAmount(transaction, amount));
	}, [cache]);

	const applyCreate = useCallback((transactions: Transaction[]): void => {
		cache.insertPaged(transactions);
	}, [cache]);

	const applyRemove = useCallback((id: string, cancelledAt: string): void => {
		cache.removePaged([id]);
		cache.patchDetails(id, (transaction) => ({ ...transaction, deletedAt: cancelledAt }));
	}, [cache]);

	const applyRemoveBatch = useCallback((ids: string[], cancelledAt: string): void => {
		cache.removePaged(ids);

		for (const id of ids) {
			cache.patchDetails(id, (transaction) => ({ ...transaction, deletedAt: cancelledAt }));
		}
	}, [cache]);

	const applySettled = useCallback((id: string, transaction: Transaction): void => {
		cache.settlePaged(id, transaction);
		cache.settleDetails(id, (current) => ({ ...current, ...transaction }));
	}, [cache]);

	const applySettledBatch = useCallback((
		temporaryIds: string[],
		transactions: Transaction[],
	): void => {
		cache.removePaged(temporaryIds);
		cache.settleInserted(transactions);
	}, [cache]);

	return useMemo(() => ({
		capture: cache.capture,
		restore: cache.restore,
		project,
		applyPatch,
		applyAdjust,
		applyCreate,
		applyRemove,
		applyRemoveBatch,
		applySettled,
		applySettledBatch,
	}), [
		cache.capture,
		cache.restore,
		project,
		applyPatch,
		applyAdjust,
		applyCreate,
		applyRemove,
		applyRemoveBatch,
		applySettled,
		applySettledBatch,
	]);
};

export { useOptimisticTransactions };
export type {
	OptimisticDraftInput,
	OptimisticDraftResult,
	UseOptimisticTransactionsReturn,
};
