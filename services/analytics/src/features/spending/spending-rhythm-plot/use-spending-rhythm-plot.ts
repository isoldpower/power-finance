import { useCallback, useMemo, useState } from "react";
import { heatColor } from "@entity/spending";
import { hourMarks, rhythmSizing, rhythmTooltipAnchor, weekdayMarks } from "./plot-partials/rhythm-layout.ts";

import type { RhythmGrid } from "@entity/spending";
import type { HoveredRhythmCell } from "./types.ts";


type HeatCount = number | { valueOf(): number };

const useSpendingRhythmPlot = (grid: RhythmGrid, width: number, color: string) => {
	const [hoveredCell, setHoveredCell] = useState<HoveredRhythmCell | null>(null);

	const sizing = useMemo(() => {
		return rhythmSizing(width);
	}, [width]);
	const weekdays = useMemo(() => {
		return weekdayMarks(sizing.cellHeight);
	}, [sizing.cellHeight]);
	const hours = useMemo(() => {
		return hourMarks(sizing.cellWidth);
	}, [sizing.cellWidth]);
	const tooltipAnchor = useMemo(() => {
		return hoveredCell ? rhythmTooltipAnchor(hoveredCell, sizing) : null;
	}, [hoveredCell, sizing]);

	const colorScale = useCallback((count: HeatCount) => {
		const ratio = grid.peak > 0 ? Number(count) / grid.peak : 0;

		return heatColor(Math.sqrt(ratio), color);
	}, [grid.peak, color]);
	const columnX = useCallback((column: number) => {
		return column * sizing.cellWidth;
	}, [sizing.cellWidth]);
	const rowY = useCallback((row: number) => {
		return row * sizing.cellHeight;
	}, [sizing.cellHeight]);
	const hoverCell = useCallback((cell: HoveredRhythmCell, hovered: boolean) => {
		setHoveredCell(hovered ? cell : null);
	}, []);
	const isCellHovered = useCallback((weekday: number, hour: number) => {
		return hoveredCell?.weekday === weekday && hoveredCell.hour === hour;
	}, [hoveredCell]);

	return {
		sizing,
		weekdays,
		hours,
		hoveredCell,
		tooltipAnchor,
		colorScale,
		columnX,
		rowY,
		hoverCell,
		isCellHovered,
	};
};

export { useSpendingRhythmPlot };
