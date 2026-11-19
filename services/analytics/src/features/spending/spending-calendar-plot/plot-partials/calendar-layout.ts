import { weekdayLabel } from "@entity/spending";
import {
	CALENDAR_HEADER_HEIGHT,
	CALENDAR_LABEL_WIDTH,
	GAP,
	MAX_CELL,
	MIN_CELL,
	VISIBLE_WEEKDAY_ROWS,
	WEEKDAY_ROWS,
} from "../config.ts";

import type { CalendarCellView, CalendarGrid } from "@entity/spending";


interface CalendarSizing {
	cell: number;
	pitch: number;
	height: number;
}

interface MonthMark {
	key: string;
	month: string;
	x: number;
}

interface WeekdayMark {
	row: number;
	label: string;
	y: number;
}

interface CellPosition {
	x: number;
	y: number;
}

interface CalendarTooltipAnchor {
	top: number;
	left: number;
}

const calendarSizing = (width: number, weeks: number): CalendarSizing => {
	const gridWidth = width - CALENDAR_LABEL_WIDTH;
	const fittedCell = gridWidth / Math.max(1, weeks) - GAP;
	const cell = Math.max(MIN_CELL, Math.min(MAX_CELL, fittedCell));
	const pitch = cell + GAP;

	return { cell, pitch, height: CALENDAR_HEADER_HEIGHT + WEEKDAY_ROWS * pitch };
};

const cellPosition = (view: CalendarCellView, pitch: number): CellPosition => ({
	x: view.week * pitch,
	y: view.weekday * pitch,
});

const monthMarks = (grid: CalendarGrid, pitch: number): MonthMark[] => {
	return grid.months.map((mark) => ({
		key: `${mark.week.toString()}-${mark.month}`,
		month: mark.month,
		x: mark.week * pitch,
	}));
};

const weekdayMarks = ({ cell, pitch }: CalendarSizing): WeekdayMark[] => {
	return VISIBLE_WEEKDAY_ROWS.map((row) => {
		const rowTop = row * pitch;

		return { row, label: weekdayLabel(row), y: rowTop + cell / 2 };
	});
};

const calendarTooltipAnchor = (view: CalendarCellView, { cell, pitch }: CalendarSizing): CalendarTooltipAnchor => {
	const { x, y } = cellPosition(view, pitch);

	return { top: CALENDAR_HEADER_HEIGHT + y + cell, left: CALENDAR_LABEL_WIDTH + x + cell };
};

export { calendarSizing, calendarTooltipAnchor, cellPosition, monthMarks, weekdayMarks };
export type { CalendarSizing, CalendarTooltipAnchor, CellPosition, MonthMark, WeekdayMark };
