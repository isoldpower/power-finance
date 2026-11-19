import { hourTickLabel, WEEKDAY_LABELS } from "@entity/spending";
import {
	CELL_ASPECT,
	FOOTER_HEIGHT,
	HOUR_LABEL_OFFSET,
	HOUR_TICKS,
	HOURS_PER_DAY,
	MAX_CELL_HEIGHT,
	MIN_CELL_HEIGHT,
	RHYTHM_LABEL_WIDTH,
	WEEKDAY_ROWS,
} from "../config.ts";

import type { HoveredRhythmCell } from "../types.ts";


interface RhythmSizing {
	cellWidth: number;
	cellHeight: number;
	height: number;
	hourAxisY: number;
}

interface WeekdayMark {
	label: string;
	y: number;
}

interface HourMark {
	hour: number;
	label: string;
	x: number;
}

interface RhythmTooltipAnchor {
	top: number;
	left: number;
}

const rhythmSizing = (width: number): RhythmSizing => {
	const gridWidth = width - RHYTHM_LABEL_WIDTH;
	const cellWidth = gridWidth / HOURS_PER_DAY;
	const fittedHeight = cellWidth * CELL_ASPECT;
	const cellHeight = Math.min(MAX_CELL_HEIGHT, Math.max(MIN_CELL_HEIGHT, fittedHeight));
	const gridHeight = cellHeight * WEEKDAY_ROWS;

	return {
		cellWidth,
		cellHeight,
		height: gridHeight + FOOTER_HEIGHT,
		hourAxisY: gridHeight + HOUR_LABEL_OFFSET,
	};
};

const weekdayMarks = (cellHeight: number): WeekdayMark[] => {
	return WEEKDAY_LABELS.map((label, row) => {
		const rowTop = row * cellHeight;

		return { label, y: rowTop + cellHeight / 2 };
	});
};

const hourMarks = (cellWidth: number): HourMark[] => {
	return HOUR_TICKS.map((hour) => {
		const columnLeft = hour * cellWidth;

		return { hour, label: hourTickLabel(hour), x: columnLeft + cellWidth / 2 };
	});
};

const rhythmTooltipAnchor = (
	cell: HoveredRhythmCell,
	{ cellWidth, cellHeight }: RhythmSizing,
): RhythmTooltipAnchor => {
	const cellTop = cell.weekday * cellHeight;
	const cellLeft = cell.hour * cellWidth;

	return { top: cellTop + cellHeight, left: RHYTHM_LABEL_WIDTH + cellLeft + cellWidth };
};

export { hourMarks, rhythmSizing, rhythmTooltipAnchor, weekdayMarks };
export type { HourMark, RhythmSizing, RhythmTooltipAnchor, WeekdayMark };
