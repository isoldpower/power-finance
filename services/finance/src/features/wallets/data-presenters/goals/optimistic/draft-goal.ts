import { v4 as uuidv4 } from "uuid";

import { ZERO_AMOUNT } from "@shared/api";

import type { Goal, GoalDraft } from "@entity/wallets";


const OPTIMISTIC_ID_PREFIX = 'optimistic';

const optimisticGoalId = (): string => {
	return `${OPTIMISTIC_ID_PREFIX}:${uuidv4()}`;
}

const isOptimisticGoalId = (id: string): boolean => {
	return id.startsWith(`${OPTIMISTIC_ID_PREFIX}:`);
}

const goalFromDraft = (draft: GoalDraft, id: string, createdAt: string): Goal => ({
	id,
	name: draft.name,
	url: null,
	currency: draft.currency,
	finishAt: draft.finishAt,
	createdAt,
	updatedAt: null,
	deletedAt: null,
	target: { 
		amount: draft.target, 
		currency: draft.currency,
	},
	progress: { 
		amount: ZERO_AMOUNT, 
		currency: draft.currency,
	},
});

export { goalFromDraft, isOptimisticGoalId, optimisticGoalId };
