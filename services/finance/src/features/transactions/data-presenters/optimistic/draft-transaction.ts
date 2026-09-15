import { v4 as uuidv4 } from "uuid";

import type {
	Transaction,
	TransactionChainRef,
	TransactionDraft,
	TransactionWalletRef,
} from "@entity/transactions";


const OPTIMISTIC_ID_PREFIX = 'optimistic';

const optimisticTransactionId = (): string => `${OPTIMISTIC_ID_PREFIX}:${uuidv4()}`;

const isOptimisticTransactionId = (id: string): boolean => id.startsWith(`${OPTIMISTIC_ID_PREFIX}:`);

interface OptimisticTransactionInput {
	draft: TransactionDraft;
	id: string;
	createdAt: string;
	wallet: TransactionWalletRef;
	chain: TransactionChainRef | null;
}

const transactionFromDraft = (input: OptimisticTransactionInput): Transaction => ({
	id: input.id,
	name: input.draft.name,
	createdAt: input.createdAt,
	updatedAt: null,
	deletedAt: null,
	money: { amount: input.draft.amount, currency: input.draft.currency },
	type: input.draft.type,
	origin: input.draft.origin,
	wallet: input.wallet,
	category: input.draft.category,
	chain: input.chain,
});

export { isOptimisticTransactionId, optimisticTransactionId, transactionFromDraft };
export type { OptimisticTransactionInput };
