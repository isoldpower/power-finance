import { useMemo } from "react";
import { useKeyedTransition } from "@shared/charts";
import { BREAKDOWN_SLICE_TWEEN_FIELDS } from "../breakdown-transition";
import { PADDING } from "./config.ts";
import { radialRings } from "./plot-partials/radial-rings.ts";

import type { BreakdownSlice } from "@entity/spending";


interface CategoryRadialPlotParams {
	slices: BreakdownSlice[];
	focused: string | null;
	width: number;
	height: number;
}

const useCategoryRadialPlot = ({ slices, focused, width, height }: CategoryRadialPlotParams) => {
	const halfShortestSide = Math.min(width, height) / 2;
	const outerRadius = halfShortestSide - PADDING;
	const { items, progress } = useKeyedTransition(slices, { fields: BREAKDOWN_SLICE_TWEEN_FIELDS, intro: 'progress' });
	const rings = useMemo(() => {
		return radialRings(items, outerRadius, progress);
	}, [items, outerRadius, progress]);
	const activeSlice = items.find((slice) => slice.key === focused) ?? items.at(0);

	return { rings, activeSlice };
};

export { useCategoryRadialPlot };
export type { CategoryRadialPlotParams };
