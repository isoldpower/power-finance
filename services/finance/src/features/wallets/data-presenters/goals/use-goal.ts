import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { fetchGoal } from "../../goals-api";
import { GOALS_CACHE_KEYS } from "../cache-config.ts";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { LedgerEntry } from "@entity/accounts";
import type { Goal } from "@entity/wallets";
import type { FetchGoalResponse } from "../../goals-api";


type UseGoalOptions = Omit<UseQueryOptions<FetchGoalResponse>, 'queryKey' | 'queryFn'>;

type UseGoalReturn = UseQueryResult<FetchGoalResponse> & {
	goal: Goal | undefined;
	history: LedgerEntry[];
};

const EMPTY_HISTORY: LedgerEntry[] = [];

const useGoal = (
	id: string,
	options?: UseGoalOptions
): UseGoalReturn => {
	const apiContext = useApiContext();
	const query = useQuery<FetchGoalResponse>({
		queryKey: [GOALS_CACHE_KEYS.fetch, id],
		queryFn: () => fetchGoal({
			handler: apiContext.goalServers.rest,
			id,
		}),
		enabled: id !== '',
		...options ?? {},
	});

	return useMemo(() => ({
		...query,
		goal: query.data?.goal,
		history: query.data?.history.items ?? EMPTY_HISTORY,
	}), [query]);
};

export { useGoal };
export type { UseGoalOptions, UseGoalReturn };
