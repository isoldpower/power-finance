import { useMemo } from "react";
import { presetRange } from "@entity/filters";
import { useAnalyticsFilters } from "../filter-store";

import type { DateRange } from "@entity/filters";


const useActiveRange = (): DateRange => {
	const preset = useAnalyticsFilters((state) => state.preset);
	const customRange = useAnalyticsFilters((state) => state.customRange);

	return useMemo(() => {
		return preset === 'custom' && customRange !== null
			? customRange
			: presetRange(preset === 'custom' ? '3M' : preset, Date.now());
	}, [preset, customRange]);
};

export { useActiveRange };
