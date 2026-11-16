import { useCallback, useMemo } from "react";
import { categoryKey, OTHER_KEY } from "@entity/spending";
import { OTHER_SERIES_COLOR, SERIES_SLOTS, seriesColor } from "@shared/charts";
import { useCategoryBreakdown } from "../data-presenters";

import type { AnalyticsQuery, LedgerSide } from "@entity/filters";


type CategoryColorOf = (key: string) => string;

const useCategoryPalette = (query: AnalyticsQuery, side: LedgerSide): CategoryColorOf => {
	const { breakdown } = useCategoryBreakdown(query, side);
	const slots = useMemo(() => new Map(
		(breakdown?.categories ?? [])
			.slice(0, SERIES_SLOTS)
			.map((share, index) => [categoryKey(share.category), index]),
	), [breakdown]);

	return useCallback((key: string) => {
		if (key === OTHER_KEY) {
			return OTHER_SERIES_COLOR;
		}

		const slot = slots.get(key);

		return slot === undefined 
			? OTHER_SERIES_COLOR
			: seriesColor(slot);
	}, [slots]);
};

export { useCategoryPalette };
export type { CategoryColorOf };
