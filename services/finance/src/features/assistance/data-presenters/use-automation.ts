import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { fetchAutomation } from "../automations-api";
import { AUTOMATIONS_CACHE_KEYS } from "./cache-config.ts";
import type { AutomationRule, FetchAutomationResponse } from "../automations-api";


type UseAutomationReturn = UseQueryResult<FetchAutomationResponse> & {
	rule?: AutomationRule;
};

const useAutomation = (
	id: string
): UseAutomationReturn => {
	const apiContext = useApiContext();
	const query = useQuery<FetchAutomationResponse>({
		queryKey: [AUTOMATIONS_CACHE_KEYS.fetch, id],
		queryFn: () => fetchAutomation({ handler: apiContext.automationServers.rest, id }),
		enabled: id !== '',
	});

	return useMemo(() => ({
		...query,
		rule: query.data?.data,
	}), [query]);
};

export { useAutomation };
export type { UseAutomationReturn };
