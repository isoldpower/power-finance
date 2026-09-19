import { compareAmounts, toAmountString } from "@shared/api";

import type { Goal, GoalQuery } from "@entity/wallets";


const matchesName = (
	goal: Goal,
	needle: string | undefined,
): boolean => {
	if (!needle) return true;

	return goal.name.toLowerCase().includes(needle.toLowerCase());
};

const matchesCurrency = (
	goal: Goal,
	currencies: string[] | undefined
): boolean => {
	if (!currencies?.length) return true;

	return currencies.includes(goal.currency);
};

const withinAmount = (
	amount: string,
	minimum: number | undefined,
	maximum: number | undefined,
): boolean => {
	const aboveFloor = minimum === undefined
		|| compareAmounts(amount, toAmountString(minimum)) >= 0;
	const belowCeiling = maximum === undefined
		|| compareAmounts(amount, toAmountString(maximum)) <= 0;

	return aboveFloor && belowCeiling;
};

const withinWindow = (
	moment: string | null,
	after: string | undefined,
	before: string | undefined,
): boolean => {
	if (!after && !before) return true;
	if (moment === null) return false;

	return (!after || moment >= after) && (!before || moment <= before);
};

const matchesGoalQuery = (
	goal: Goal,
	query: GoalQuery,
): boolean => (
	matchesName(goal, query.name) &&
	matchesCurrency(goal, query.currencies) &&
	withinAmount(goal.target.amount, query.minTarget, query.maxTarget) &&
	withinAmount(goal.progress.amount, query.minProgress, query.maxProgress) &&
	withinWindow(goal.finishAt, query.finishAfter, query.finishBefore) &&
	withinWindow(goal.createdAt, query.createdAfter, query.createdBefore)
);

export { matchesGoalQuery };
