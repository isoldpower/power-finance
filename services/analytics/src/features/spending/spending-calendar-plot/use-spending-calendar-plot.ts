import { useCallback, useMemo, useState } from "react";
import { calendarSizing, calendarTooltipAnchor, cellPosition, monthMarks, weekdayMarks } from "./plot-partials/calendar-layout.ts";

import type { CalendarCellView, CalendarGrid } from "@entity/spending";


const useSpendingCalendarPlot = (grid: CalendarGrid, width: number) => {
	const [hoveredCell, setHoveredCell] = useState<CalendarCellView | null>(null);

	const sizing = useMemo(() => {
		return calendarSizing(width, grid.weeks);
	}, [width, grid.weeks]);
	const months = useMemo(() => {
		return monthMarks(grid, sizing.pitch);
	}, [grid, sizing.pitch]);
	const weekdays = useMemo(() => {
		return weekdayMarks(sizing);
	}, [sizing]);
	const cellMarks = useMemo(() => {
		return grid.cells.map((cell) => ({
			cell,
			position: cellPosition(cell, sizing.pitch),
		}));
	}, [grid.cells, sizing.pitch]);
	const tooltipAnchor = useMemo(() => {
		return hoveredCell ? calendarTooltipAnchor(hoveredCell, sizing) : null;
	}, [hoveredCell, sizing]);

	const hoverCell = useCallback((cell: CalendarCellView, hovered: boolean) => {
		setHoveredCell(hovered ? cell : null);
	}, []);

	return { sizing, months, weekdays, cellMarks, hoveredCell, tooltipAnchor, hoverCell };
};

export { useSpendingCalendarPlot };
