import type { Goal } from "../types.ts";


const goalProgressPercent = (goal: Goal): number => {
	const target = goal.target.amount;
	if (target <= 0) {
		return 0;
	}

	const goalProgress = (goal.progress.amount / target) * 100;
	const roundedProgress = Math.round(goalProgress);
	return Math.min(100, Math.max(0, roundedProgress));
};

const goalRemainingAmount = (goal: Goal): number => {
	return Math.max(0, goal.target.amount - goal.progress.amount);
};

export { goalProgressPercent, goalRemainingAmount };
