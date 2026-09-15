import { matchesGoalQuery } from "../../../filtration";
import { GOALS_CACHE_KEYS } from "../../cache-config.ts";

import type { QueryKey } from "@tanstack/react-query";
import type { OptimisticResource } from "@shared/data";
import type { Goal, GoalQuery } from "@entity/wallets";
import type { FetchGoalResponse } from "../../../goals-api";


const MATCH_ALL: GoalQuery = {};

const searchQueryOf = (key: QueryKey): GoalQuery => {
	const [, query] = key;

	return typeof query === 'object' && query !== null ? query as GoalQuery : MATCH_ALL;
};

const GOAL_RESOURCE: OptimisticResource<Goal, Goal, FetchGoalResponse> = {
	paged: [
		{ key: GOALS_CACHE_KEYS.list },
		{
			key: GOALS_CACHE_KEYS.search,
			accepts: (key, goal) => matchesGoalQuery(goal, searchQueryOf(key)),
		},
	],
	details: [
		{
			key: GOALS_CACHE_KEYS.fetch,
			read: (response) => response.goal,
			write: (response, goal) => ({ ...response, goal }),
		},
	],
};

export { GOAL_RESOURCE };
