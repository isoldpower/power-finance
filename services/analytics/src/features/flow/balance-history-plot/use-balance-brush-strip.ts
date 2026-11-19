import { useCallback, useMemo } from "react";
import { scaleLinear } from "@visx/scale";
import { BRUSH_VERTICAL_PADDING, HISTORY_MARGIN } from "./config.ts";

import type { Bounds } from "@visx/brush/lib/types";


interface BalanceBrushStripParams {
	values: number[];
	width: number;
	height: number;
	onZoom: (start: number, end: number) => void;
	onClear: () => void;
}

const useBalanceBrushStrip = ({ values, width, height, onZoom, onClear }: BalanceBrushStripParams) => {
	const horizontalMargin = HISTORY_MARGIN.left + HISTORY_MARGIN.right;
	const innerWidth = width - horizontalMargin;

	const xScale = useMemo(() => {
		const lastIndex = Math.max(1, values.length - 1);

		return scaleLinear<number>({
			domain: [0, lastIndex],
			range: [0, innerWidth],
		});
	}, [values.length, innerWidth]);
	const yScale = useMemo(() => {
		const lowest = Math.min(0, ...values);
		const highest = Math.max(1, ...values);

		return scaleLinear<number>({
			domain: [lowest, highest],
			range: [height - BRUSH_VERTICAL_PADDING, BRUSH_VERTICAL_PADDING],
		});
	}, [values, height]);
	const points = useMemo(() => {
		return values.map((value, index) => ({
			x: xScale(index),
			y: yScale(value),
		}));
	}, [values, xScale, yScale]);

	const handleBrushChange = useCallback((bounds: Bounds | null) => {
		if (bounds === null) {
			onClear();
		} else {
			onZoom(Math.round(bounds.x0), Math.round(bounds.x1));
		}
	}, [onZoom, onClear]);

	return { innerWidth, xScale, yScale, points, handleBrushChange };
};

export { useBalanceBrushStrip };
export type { BalanceBrushStripParams };
