import { useMemo } from "react";
import { useDebounce } from "@internal/shared";

import { goalProgressPercent } from "@entity/wallets";

import { useGoalsSearch } from "../../data-presenters";

import type { Goal, GoalQuery } from "@entity/wallets";
import type { GoalsBrowseSetup } from "../types.ts";


const REACHED_PERCENT = 100;

function matchesStatus(goal: Goal, statusFilter: string): boolean {
	if (statusFilter === 'all') {
		return true;
	}

	const reached = goalProgressPercent(goal) >= REACHED_PERCENT;

	return statusFilter === 'reached' ? reached : !reached;
}

const useGoalsBrowser = (setup: GoalsBrowseSetup) => {
	const needle = useDebounce(setup.search.search?.trim() ?? '');
	const query = useMemo<GoalQuery>(
		() => ({ name: needle === '' ? undefined : needle }),
		[needle]
	);
	const { goals, total, isPending, isError } = useGoalsSearch(query);

	const searchResults = useMemo(() => {
		const filtered = goals.filter((goal) => matchesStatus(goal, setup.filters.statusFilter));

		return { goals: filtered, total: filtered.length, totalCount: total };
	}, [goals, total, setup.filters.statusFilter]);

	return { searchResults, isPending, isError };
}

export { useGoalsBrowser };
