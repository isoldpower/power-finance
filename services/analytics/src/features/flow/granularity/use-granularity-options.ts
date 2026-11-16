import { useMemo } from "react";
import { isGranularityAllowed } from "@entity/filters";

import type { DateRange, Granularity } from "@entity/filters";
import type { SegmentedOption } from "@shared/charts";


const useGranularityOptions = (
	range: DateRange,
	options: SegmentedOption<Granularity>[],
): SegmentedOption<Granularity>[] => {
	return useMemo(() => {
		return options.map((option) => ({
			...option,
			disabled: !isGranularityAllowed(range, option.value),
		}));
	}, [range, options]);
};

export { useGranularityOptions };
