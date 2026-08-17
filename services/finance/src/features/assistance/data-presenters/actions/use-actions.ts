import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { listActions } from "../../actions-api";
import { ACTIONS_CACHE_KEYS } from "../cache-config.ts";
import type { PageParams } from "@shared/api";
import type { Action, ActionQuery } from "@entity/assistance";
import type { ListActionsResponse } from "../../actions-api";

type UseActionsOptions = Omit<UseQueryOptions<ListActionsResponse>, 'queryKey' | 'queryFn'>;

type UseActionsReturn = UseQueryResult<ListActionsResponse> & {
	actions: Action[];
	total: number;
};

const EMPTY_ACTIONS: Action[] = [];

const useActions = (
	query?: ActionQuery,
	page?: PageParams,
	options?: UseActionsOptions
): UseActionsReturn => {
	const apiContext = useApiContext();
	const actionsQuery = useQuery<ListActionsResponse>({
		queryKey: [
			ACTIONS_CACHE_KEYS.list,
			query?.status ?? 'pending',
			query?.source ?? 'any',
			query?.severity ?? 'any',
			page?.limit ?? 'default',
			page?.cursor ?? 'first',
		],
		queryFn: () => listActions({
			handler: apiContext.actionServers.rest,
			query,
			page,
		}),
		...options ?? {},
	});

	return useMemo(() => ({
		...actionsQuery,
		actions: actionsQuery.data?.page.items ?? EMPTY_ACTIONS,
		total: actionsQuery.data?.page.total ?? 0,
	}), [actionsQuery]);
};

export { useActions };
export type { UseActionsOptions, UseActionsReturn };
