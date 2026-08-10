import { useMemo } from "react";

import { goalProgressPercent } from "@entity/wallets";

import { useGoals } from "../data-presenters";

import type { GoalsBrowseSetup } from "./types.ts";
import type { GoalWallet } from "@entity/wallets";


function matchesSearch(goal: GoalWallet, search: string): boolean {
	if (search === '') {
		return true;
	}

	return goal.name.toLowerCase().includes(search);
}

function matchesStatus(goal: GoalWallet, statusFilter: string): boolean {
	if (statusFilter === 'all') {
		return true;
	}

	const reached = goalProgressPercent(goal) >= 100;

	return statusFilter === 'reached' ? reached : !reached;
}

const useGoalsBrowser = (setup: GoalsBrowseSetup) => {
	const { goals, isPending, isError } = useGoals();

	const searchResults = useMemo(() => {
		const search = setup.search.search?.trim().toLowerCase() ?? '';
		const filtered = goals.filter((goal) => {
			return matchesSearch(goal, search) && matchesStatus(goal, setup.filters.statusFilter);
		});

		return { goals: filtered, total: filtered.length, totalCount: goals.length };
	}, [goals, setup.filters.statusFilter, setup.search.search]);

	return { searchResults, isPending, isError };
}

export { useGoalsBrowser };
