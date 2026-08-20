import { DEFAULT_GOAL_COLOR, DEFAULT_GOAL_ICON } from "../visual-map";
import { goalProgressPercent } from "./goal-progress.ts";

import type { Goal } from "../types.ts";
import type { GoalView } from "./types.ts";
import type { FormatMoney } from "@shared/formatting";


const MONTH_IN_MS = 30 * 24 * 60 * 60 * 1000;

const toEtaLabel = (finishAt: string, percent: number): string => {
	if (percent >= 100) return 'reached';

	const remaining = new Date(finishAt).getTime() - Date.now();
	if (Number.isNaN(remaining)) return 'in progress';
	if (remaining <= 0) return 'overdue';

	return `~${Math.ceil(remaining / MONTH_IN_MS).toString()} mo left`;
};

const toGoalView = (goal: Goal, formatMoney: FormatMoney): GoalView => {
	const { currency } = goal.target;
	const percent = goalProgressPercent(goal);

	return {
		id: goal.id,
		icon: DEFAULT_GOAL_ICON,
		color: DEFAULT_GOAL_COLOR,
		name: goal.name,
		eta: toEtaLabel(goal.finishAt, percent),
		saved: formatMoney(goal.progress.amount, currency),
		target: formatMoney(goal.target.amount, currency),
		percent,
	};
};

export { toGoalView };
