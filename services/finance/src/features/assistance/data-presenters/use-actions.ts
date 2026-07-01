import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { listActions } from "../actions-api";
import { ACTIONS_CACHE_KEYS } from "./cache-config.ts";
import type { Action, ListActionsResponse } from "../actions-api";


interface UseActionsParams {
	resolved?: boolean;
	limit?: number;
}

type UseActionsOptions = Omit<UseQueryOptions<ListActionsResponse>, 'queryKey' | 'queryFn'>;

type UseActionsReturn = UseQueryResult<ListActionsResponse> & {
	actions: Action[];
};

const useActions = (
	params?: UseActionsParams,
	options?: UseActionsOptions
): UseActionsReturn => {
	const apiContext = useApiContext();
	const query = useQuery<ListActionsResponse>({
		queryKey: [ACTIONS_CACHE_KEYS.list, params?.resolved ?? false, params?.limit ?? 'all'],
		queryFn: () => listActions({
			handler: apiContext.actionServers.rest,
			resolved: params?.resolved,
			limit: params?.limit,
		}),
		...options ?? {},
	});

	return useMemo(() => ({
		...query,
		actions: query.data?.data ?? [],
	}), [query]);
};

export { useActions };
export type { UseActionsParams, UseActionsOptions, UseActionsReturn };
