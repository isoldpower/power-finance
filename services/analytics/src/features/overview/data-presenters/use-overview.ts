import { useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { getOverview } from "../overview-api";
import { OVERVIEW_CACHE_KEYS } from "./cache-config.ts";

import type { UseQueryResult } from "@tanstack/react-query";
import type { AnalyticsQuery } from "@entity/filters";
import type { Overview } from "@entity/overview";


type UseOverviewReturn = UseQueryResult<Overview> & {
	overview: Overview | undefined;
};

const useOverview = (query: AnalyticsQuery): UseOverviewReturn => {
	const { overviewServers } = useApiContext();

	const result = useQuery({
		queryKey: [OVERVIEW_CACHE_KEYS.overview, query],
		queryFn: () => getOverview({ handler: overviewServers.rest, query }),
		placeholderData: keepPreviousData,
	});

	return useMemo(() => ({ ...result, overview: result.data }), [result]);
};

export { useOverview };
export type { UseOverviewReturn };
