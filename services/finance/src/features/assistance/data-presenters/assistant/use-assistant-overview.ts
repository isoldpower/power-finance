import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { fetchAssistantOverview } from "../../assistant-api";
import { ASSISTANT_CACHE_KEYS } from "../cache-config.ts";
import type { AssistantOverview } from "@entity/assistance";

type UseAssistantOverviewOptions = Omit<UseQueryOptions<AssistantOverview>, 'queryKey' | 'queryFn'>;

type UseAssistantOverviewReturn = UseQueryResult<AssistantOverview> & {
	overview: AssistantOverview;
};

const EMPTY_OVERVIEW: AssistantOverview = { signals: [], prompts: [] };

const useAssistantOverview = (
	options?: UseAssistantOverviewOptions
): UseAssistantOverviewReturn => {
	const apiContext = useApiContext();
	const overviewQuery = useQuery<AssistantOverview>({
		queryKey: [ASSISTANT_CACHE_KEYS.overview],
		queryFn: () => fetchAssistantOverview({ handler: apiContext.assistantServers.rest }),
		...options ?? {},
	});

	return useMemo(() => ({
		...overviewQuery,
		overview: overviewQuery.data ?? EMPTY_OVERVIEW,
	}), [overviewQuery]);
};

export { useAssistantOverview };
export type { UseAssistantOverviewOptions, UseAssistantOverviewReturn };
