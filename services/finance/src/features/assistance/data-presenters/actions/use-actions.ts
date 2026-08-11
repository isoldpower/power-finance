import type { UseQueryOptions } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { useResourceQuery } from "@shared/data";
import type { UseResourceQueryResult } from "@shared/data";
import { listActions } from "../../assistance-api/actions";
import { ACTIONS_CACHE_KEYS } from "../cache-config.ts";
import type { Action, ListActionsResponse } from "../../assistance-api/actions";


interface UseActionsParams {
	resolved?: boolean;
	limit?: number;
}

type UseActionsOptions = Omit<UseQueryOptions<ListActionsResponse>, 'queryKey' | 'queryFn'>;

type UseActionsReturn = UseResourceQueryResult<ListActionsResponse, Action[]> & {
	actions: Action[];
};

const EMPTY_ACTIONS: Action[] = [];

const useActions = (
	params?: UseActionsParams,
	options?: UseActionsOptions
): UseActionsReturn => {
	const apiContext = useApiContext();
	const query = useResourceQuery<ListActionsResponse, Action[]>({
		key: [ACTIONS_CACHE_KEYS.list, params?.resolved ?? false, params?.limit ?? 'all'],
		fetch: () => listActions({
			handler: apiContext.actionServers.rest,
			resolved: params?.resolved,
			limit: params?.limit,
		}),
		select: (response) => response.data,
		fallback: EMPTY_ACTIONS,
		options,
	});

	return { ...query, actions: query.value };
};

export { useActions };
export type { UseActionsParams, UseActionsOptions, UseActionsReturn };
