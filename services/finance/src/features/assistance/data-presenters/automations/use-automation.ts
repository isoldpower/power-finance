// @reserved-api - wired to the API and intentionally not consumed yet; awaiting post-MVP flows. NOT dead code: do not delete, do not drop from barrels.
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { fetchAutomation } from "../../assistance-api/automations";
import { AUTOMATIONS_CACHE_KEYS } from "../cache-config.ts";
import type { AutomationRule, FetchAutomationResponse } from "../../assistance-api/automations";


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
