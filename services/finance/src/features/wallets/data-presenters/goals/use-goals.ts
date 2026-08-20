import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { listGoals } from "../../goals-api";
import { GOALS_CACHE_KEYS } from "../cache-config.ts";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { PageParams } from "@shared/api";
import type { Goal } from "@entity/wallets";
import type { ListGoalsResponse } from "../../goals-api";


type UseGoalsOptions = Omit<UseQueryOptions<ListGoalsResponse>, 'queryKey' | 'queryFn'>;

type UseGoalsReturn = UseQueryResult<ListGoalsResponse> & {
	goals: Goal[];
	total: number;
	nextCursor: string | null;
	prevCursor: string | null;
};

const EMPTY_GOALS: Goal[] = [];

const useGoals = (
	page?: PageParams,
	options?: UseGoalsOptions
): UseGoalsReturn => {
	const apiContext = useApiContext();
	const query = useQuery<ListGoalsResponse>({
		queryKey: [GOALS_CACHE_KEYS.list, page?.limit ?? 'default', page?.cursor ?? 'first'],
		queryFn: () => listGoals({
			handler: apiContext.goalServers.rest,
			page,
		}),
		...options ?? {},
	});

	return useMemo(() => ({
		...query,
		goals: query.data?.page.items ?? EMPTY_GOALS,
		total: query.data?.page.total ?? 0,
		nextCursor: query.data?.page.nextCursor ?? null,
		prevCursor: query.data?.page.prevCursor ?? null,
	}), [query]);
};

export { useGoals };
export type { UseGoalsOptions, UseGoalsReturn };
