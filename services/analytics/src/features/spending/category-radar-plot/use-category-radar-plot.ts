import { useMemo } from "react";
import { useKeyedTransition } from "@shared/charts";
import { BREAKDOWN_SLICE_TWEEN_FIELDS } from "../breakdown-transition";
import { radarLayout } from "./plot-partials/radar-layout.ts";
import { radarRadius } from "./plot-partials/radar-radius.ts";

import type { BreakdownSlice } from "@entity/spending";


const useCategoryRadarPlot = (slices: BreakdownSlice[], width: number, height: number) => {
	const radius = radarRadius(width, height);
	const axesKey = useMemo(() => {
		return slices.map((slice) => slice.key).join('|');
	}, [slices]);
	const { items: shownSlices, progress } = useKeyedTransition(slices, {
		fields: BREAKDOWN_SLICE_TWEEN_FIELDS,
		intro: 'progress',
		resetKey: axesKey,
	});
	const layout = useMemo(() => {
		return radarLayout(shownSlices, radius, progress);
	}, [shownSlices, radius, progress]);

	return { shownSlices, layout };
};

export { useCategoryRadarPlot };
