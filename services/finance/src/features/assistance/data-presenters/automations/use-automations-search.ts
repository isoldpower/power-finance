import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { searchAutomations } from "../../automations-api";
import { AUTOMATIONS_CACHE_KEYS } from "../cache-config.ts";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { PageParams } from "@shared/api";
import type { Automation, AutomationSearchQuery } from "@entity/assistance";
import type { SearchAutomationsResponse } from "../../automations-api";


type UseAutomationsSearchParams = PageParams;

type UseAutomationsSearchOptions = Omit<
	UseQueryOptions<SearchAutomationsResponse>,
	'queryKey' | 'queryFn'
>;

type UseAutomationsSearchReturn = UseQueryResult<SearchAutomationsResponse> & {
	rules: Automation[];
	total: number;
	nextCursor: string | null;
	prevCursor: string | null;
};

const EMPTY_RULES: Automation[] = [];

const useAutomationsSearch = (
	query: AutomationSearchQuery,
	params?: UseAutomationsSearchParams,
	options?: UseAutomationsSearchOptions
): UseAutomationsSearchReturn => {
	const apiContext = useApiContext();
	const searchQuery = useQuery<SearchAutomationsResponse>({
		queryKey: [
			AUTOMATIONS_CACHE_KEYS.search,
			query,
			params?.limit ?? 'default',
			params?.cursor ?? 'first',
		],
		queryFn: () => searchAutomations({
			handler: apiContext.automationServers.rest,
			query,
			page: { limit: params?.limit, cursor: params?.cursor },
		}),
		...options ?? {},
	});

	return useMemo(() => ({
		...searchQuery,
		rules: searchQuery.data?.page.items ?? EMPTY_RULES,
		total: searchQuery.data?.page.total ?? 0,
		nextCursor: searchQuery.data?.page.nextCursor ?? null,
		prevCursor: searchQuery.data?.page.prevCursor ?? null,
	}), [searchQuery]);
};

export { useAutomationsSearch };
export type {
	UseAutomationsSearchOptions,
	UseAutomationsSearchParams,
	UseAutomationsSearchReturn,
};
