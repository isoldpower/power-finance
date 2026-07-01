import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { listAutomations } from "../automations-api";
import { AUTOMATIONS_CACHE_KEYS } from "./cache-config.ts";
import type { AutomationRule, ListAutomationsResponse } from "../automations-api";


interface UseAutomationsParams {
	enabled?: boolean;
	limit?: number;
}

type UseAutomationsOptions = Omit<UseQueryOptions<ListAutomationsResponse>, 'queryKey' | 'queryFn'>;

type UseAutomationsReturn = UseQueryResult<ListAutomationsResponse> & {
	rules: AutomationRule[];
};

const useAutomations = (
	params?: UseAutomationsParams,
	options?: UseAutomationsOptions
): UseAutomationsReturn => {
	const apiContext = useApiContext();
	const query = useQuery<ListAutomationsResponse>({
		queryKey: [AUTOMATIONS_CACHE_KEYS.list, params?.enabled ?? 'all', params?.limit ?? 'all'],
		queryFn: () => listAutomations({
			handler: apiContext.automationServers.rest,
			enabled: params?.enabled,
			limit: params?.limit,
		}),
		...options ?? {},
	});

	return useMemo(() => ({
		...query,
		rules: query.data?.data ?? [],
	}), [query]);
};

export { useAutomations };
export type { UseAutomationsParams, UseAutomationsOptions, UseAutomationsReturn };
