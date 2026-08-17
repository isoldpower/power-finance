import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { listAutomations } from "../../automations-api";
import { AUTOMATIONS_CACHE_KEYS } from "../cache-config.ts";
import type { PageParams } from "@shared/api";
import type { Automation, AutomationQuery } from "@entity/assistance";
import type { ListAutomationsResponse } from "../../automations-api";

type UseAutomationsOptions = Omit<UseQueryOptions<ListAutomationsResponse>, 'queryKey' | 'queryFn'>;

type UseAutomationsReturn = UseQueryResult<ListAutomationsResponse> & {
	rules: Automation[];
	total: number;
	nextCursor: string | null;
	prevCursor: string | null;
};

const EMPTY_RULES: Automation[] = [];

const useAutomations = (
	query?: AutomationQuery,
	page?: PageParams,
	options?: UseAutomationsOptions
): UseAutomationsReturn => {
	const apiContext = useApiContext();
	const automationsQuery = useQuery<ListAutomationsResponse>({
		queryKey: [
			AUTOMATIONS_CACHE_KEYS.list,
			query?.enabled ?? 'any',
			page?.limit ?? 'default',
			page?.cursor ?? 'first',
		],
		queryFn: () => listAutomations({
			handler: apiContext.automationServers.rest,
			query,
			page,
		}),
		...options ?? {},
	});

	return useMemo(() => ({
		...automationsQuery,
		rules: automationsQuery.data?.page.items ?? EMPTY_RULES,
		total: automationsQuery.data?.page.total ?? 0,
		nextCursor: automationsQuery.data?.page.nextCursor ?? null,
		prevCursor: automationsQuery.data?.page.prevCursor ?? null,
	}), [automationsQuery]);
};

export { useAutomations };
export type { UseAutomationsOptions, UseAutomationsReturn };
