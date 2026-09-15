import { useCallback, useMemo } from "react";
import { useOptimisticCache } from "@shared/data";

import { patchGoal } from "./patch-goal.ts";
import { GOAL_RESOURCE } from "./resource.ts";

import type { Goal, GoalPatch } from "@entity/wallets";
import type { GoalCachesSnapshot } from "./types.ts";


interface UseOptimisticGoalsReturn {
	capture: () => Promise<GoalCachesSnapshot>;
	restore: (snapshot: GoalCachesSnapshot | undefined) => void;
	applyPatch: (id: string, patch: GoalPatch) => void;
	applyCreate: (goal: Goal) => void;
	applyRemove: (id: string, closedAt: string) => void;
	applySettled: (id: string, goal: Goal) => void;
}

const useOptimisticGoals = (): UseOptimisticGoalsReturn => {
	const cache = useOptimisticCache(GOAL_RESOURCE);

	const applyPatch = useCallback((id: string, patch: GoalPatch): void => {
		cache.patchPaged(id, (goal) => patchGoal(goal, patch));
		cache.patchDetails(id, (goal) => patchGoal(goal, patch));
	}, [cache]);

	const applyCreate = useCallback((goal: Goal): void => {
		cache.insertPaged([goal]);
	}, [cache]);

	const applyRemove = useCallback((id: string, closedAt: string): void => {
		cache.removePaged([id]);
		cache.patchDetails(id, (goal) => ({ ...goal, deletedAt: closedAt }));
	}, [cache]);

	const applySettled = useCallback((id: string, goal: Goal): void => {
		cache.settlePaged(id, goal);
		cache.settleDetails(id, (current) => ({ ...current, ...goal }));
	}, [cache]);

	return useMemo(() => ({
		capture: cache.capture,
		restore: cache.restore,
		applyPatch,
		applyCreate,
		applyRemove,
		applySettled,
	}), [cache.capture, cache.restore, applyPatch, applyCreate, applyRemove, applySettled]);
};

export { useOptimisticGoals };
export type { UseOptimisticGoalsReturn };
