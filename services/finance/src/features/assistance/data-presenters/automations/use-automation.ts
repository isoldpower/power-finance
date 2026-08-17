import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { fetchAutomation } from "../../automations-api";
import { AUTOMATIONS_CACHE_KEYS } from "../cache-config.ts";
import type { Automation } from "@entity/assistance";

type UseAutomationOptions = Omit<UseQueryOptions<Automation>, 'queryKey' | 'queryFn'>;

type UseAutomationReturn = UseQueryResult<Automation> & {
	rule: Automation | undefined;
};

const useAutomation = (
	id: string,
	options?: UseAutomationOptions
): UseAutomationReturn => {
	const apiContext = useApiContext();
	const automationQuery = useQuery<Automation>({
		queryKey: [AUTOMATIONS_CACHE_KEYS.fetch, id],
		queryFn: () => fetchAutomation({ handler: apiContext.automationServers.rest, id }),
		enabled: id !== '',
		...options ?? {},
	});

	return useMemo(() => ({
		...automationQuery,
		rule: automationQuery.data,
	}), [automationQuery]);
};

export { useAutomation };
export type { UseAutomationOptions, UseAutomationReturn };
