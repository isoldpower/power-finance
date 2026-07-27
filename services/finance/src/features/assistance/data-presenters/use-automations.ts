import type { UseQueryOptions } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { useResourceQuery } from "@shared/data";
import type { UseResourceQueryResult } from "@shared/data";
import { listAutomations } from "../automations-api";
import { AUTOMATIONS_CACHE_KEYS } from "./cache-config.ts";
import type { AutomationRule, ListAutomationsResponse } from "../automations-api";


interface UseAutomationsParams {
	enabled?: boolean;
	limit?: number;
}

type UseAutomationsOptions = Omit<UseQueryOptions<ListAutomationsResponse>, 'queryKey' | 'queryFn'>;

type UseAutomationsReturn = UseResourceQueryResult<ListAutomationsResponse, AutomationRule[]> & {
	rules: AutomationRule[];
};

const EMPTY_RULES: AutomationRule[] = [];

const useAutomations = (
	params?: UseAutomationsParams,
	options?: UseAutomationsOptions
): UseAutomationsReturn => {
	const apiContext = useApiContext();
	const query = useResourceQuery<ListAutomationsResponse, AutomationRule[]>({
		key: [AUTOMATIONS_CACHE_KEYS.list, params?.enabled ?? 'all', params?.limit ?? 'all'],
		fetch: () => listAutomations({
			handler: apiContext.automationServers.rest,
			enabled: params?.enabled,
			limit: params?.limit,
		}),
		select: (response) => response.data,
		fallback: EMPTY_RULES,
		options,
	});

	return { ...query, rules: query.value };
};

export { useAutomations };
export type { UseAutomationsParams, UseAutomationsOptions, UseAutomationsReturn };
