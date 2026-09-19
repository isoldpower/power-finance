import { compareAmounts, parseAmount, subtractAmounts, ZERO_AMOUNT } from "@shared/api";

import type { Goal } from "../types.ts";


const goalProgressPercent = (goal: Goal): number => {
	const target = parseAmount(goal.target.amount);
	if (target <= 0) {
		return 0;
	}

	const goalProgress = (parseAmount(goal.progress.amount) / target) * 100;
	const roundedProgress = Math.round(goalProgress);
	return Math.min(100, Math.max(0, roundedProgress));
};

const goalRemainingAmount = (goal: Goal): string => {
	const remaining = subtractAmounts(goal.target.amount, goal.progress.amount);

	return compareAmounts(remaining, ZERO_AMOUNT) > 0 
		? remaining 
		: ZERO_AMOUNT;
};

export { goalProgressPercent, goalRemainingAmount };
