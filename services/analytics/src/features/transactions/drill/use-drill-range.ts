import { useMemo } from "react";
import { drillScope } from "./drill-partials/drill-scope.ts";

import type { AnalyticsQuery, DateRange, Drill } from "@entity/filters";


const useDrillRange = (drill: Drill, query: AnalyticsQuery): DateRange => {
	return useMemo(() => {
		return drillScope(drill, query).query.range;
	}, [drill, query]);
};

export { useDrillRange };
