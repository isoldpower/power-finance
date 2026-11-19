import { useCallback, useMemo, useRef } from "react";

import { useOptimisticGoals } from "./optimistic";

import type { GoalCachesSnapshot } from "./optimistic";


interface UseGoalFundingReturn {
	begin: (amount: string) => Promise<void>;
	rollback: () => void;
}

const useGoalFunding = (goalId: string): UseGoalFundingReturn => {
	const optimistic = useOptimisticGoals();
	const snapshotRef = useRef<GoalCachesSnapshot | undefined>(undefined);

	const begin = useCallback(async (amount: string) => {
		snapshotRef.current = await optimistic.capture();
		optimistic.applyFunding(goalId, amount);
	}, [optimistic, goalId]);

	const rollback = useCallback(() => {
		optimistic.restore(snapshotRef.current);
		snapshotRef.current = undefined;
	}, [optimistic]);

	return useMemo(() => ({ begin, rollback }), [begin, rollback]);
};

export { useGoalFunding };
export type { UseGoalFundingReturn };
