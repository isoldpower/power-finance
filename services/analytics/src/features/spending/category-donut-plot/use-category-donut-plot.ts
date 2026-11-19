import { useKeyedTransition, useTween } from "@shared/charts";
import { BREAKDOWN_SLICE_TWEEN_FIELDS } from "../breakdown-transition";
import { FULL_TURN, INNER_RATIO, PADDING } from "./config.ts";

import type { BreakdownSlice } from "@entity/spending";


interface CategoryDonutPlotParams {
	slices: BreakdownSlice[];
	total: number;
	focused: string | null;
	width: number;
	height: number;
}

const fromZero = (): number => 0;

const useCategoryDonutPlot = ({ slices, total, focused, width, height }: CategoryDonutPlotParams) => {
	const halfShortestSide = Math.min(width, height) / 2;
	const radius = halfShortestSide - PADDING;
	const innerRadius = radius * INNER_RATIO;
	const transition = useKeyedTransition(slices, { fields: BREAKDOWN_SLICE_TWEEN_FIELDS, intro: 'progress' });
	const shownTotal = useTween(total, { intro: fromZero });
	const sweep = FULL_TURN * transition.progress;
	const activeSlice = transition.items.find((slice) => slice.key === focused);

	return {
		radius,
		innerRadius,
		sweep,
		shownSlices: transition.items,
		shownTotal: shownTotal.value,
		activeSlice,
	};
};

export { useCategoryDonutPlot };
export type { CategoryDonutPlotParams };
