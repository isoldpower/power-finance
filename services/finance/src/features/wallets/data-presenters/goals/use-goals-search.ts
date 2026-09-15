import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { searchGoals } from "../../goals-api";
import { GOALS_CACHE_KEYS } from "../cache-config.ts";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { PageParams } from "@shared/api";
import type { Goal, GoalQuery } from "@entity/wallets";
import type { SearchGoalsResponse } from "../../goals-api";


type UseGoalsSearchParams = PageParams;

type UseGoalsSearchOptions = Omit<UseQueryOptions<SearchGoalsResponse>, 'queryKey' | 'queryFn'>;

type UseGoalsSearchReturn = UseQueryResult<SearchGoalsResponse> & {
	goals: Goal[];
	total: number;
	nextCursor: string | null;
	prevCursor: string | null;
};

const EMPTY_GOALS: Goal[] = [];

const useGoalsSearch = (
	query: GoalQuery,
	params?: UseGoalsSearchParams,
	options?: UseGoalsSearchOptions
): UseGoalsSearchReturn => {
	const apiContext = useApiContext();
	const searchQuery = useQuery<SearchGoalsResponse>({
		queryKey: [
			GOALS_CACHE_KEYS.search,
			query,
			params?.limit ?? 'default',
			params?.cursor ?? 'first',
		],
		queryFn: () => searchGoals({
			handler: apiContext.goalServers.rest,
			query,
			page: { limit: params?.limit, cursor: params?.cursor },
		}),
		...options ?? {},
	});

	return useMemo(() => ({
		...searchQuery,
		goals: searchQuery.data?.page.items ?? EMPTY_GOALS,
		total: searchQuery.data?.page.total ?? 0,
		nextCursor: searchQuery.data?.page.nextCursor ?? null,
		prevCursor: searchQuery.data?.page.prevCursor ?? null,
	}), [searchQuery]);
};

export { useGoalsSearch };
export type { UseGoalsSearchOptions, UseGoalsSearchParams, UseGoalsSearchReturn };
