import { useMemo } from "react";
import { Group } from "@visx/group";
import { AxisLabel, CalendarCell, heatColor, toCalendarGrid } from "@entity/spending";
import { ShowOnHoverAt } from "@feature/interactions";
import {
	CALENDAR_HEADER_HEIGHT,
	CALENDAR_LABEL_WIDTH,
	useMonthLabelFormat,
	useSpendingCalendarPlot,
} from "@feature/spending";
import { ChartTooltip, OUTFLOW_COLOR } from "@shared/charts";
import { useAmountFormat } from "@shared/formatting";
import { CalendarTooltipContent } from "./plot-partials/CalendarTooltipContent.tsx";
import { MONTH_LABEL_Y, WEEKDAY_LABEL_X } from "./config.ts";

import type { FC } from "react";
import type { SpendingCalendar } from "@entity/spending";


interface SpendingCalendarPlotProps {
	calendar: SpendingCalendar;
	width: number;
	currency: string;
	onSelectDay: (date: string) => void;
}

const SpendingCalendarPlot: FC<SpendingCalendarPlotProps> = ({ calendar, width, currency, onSelectDay }) => {
	const formatAmount = useAmountFormat(currency);
	const formatMonthLabel = useMonthLabelFormat();
	const grid = useMemo(() => {
		return toCalendarGrid(calendar, formatMonthLabel);
	}, [calendar, formatMonthLabel]);
	const {
		sizing,
		months,
		weekdays,
		cellMarks,
		hoveredCell,
		tooltipAnchor,
		hoverCell,
	} = useSpendingCalendarPlot(grid, width);
	const frameStyle = useMemo(() => {
		return { height: sizing.height };
	}, [sizing.height]);

	return (
		<div className="relative" style={frameStyle}>
			<svg width={width} height={sizing.height}>
				<Group left={CALENDAR_LABEL_WIDTH} top={CALENDAR_HEADER_HEIGHT}>
					{months.map((mark) => (
						<AxisLabel key={mark.key} x={mark.x} y={MONTH_LABEL_Y}>
							{mark.month}
						</AxisLabel>
					))}
					{weekdays.map((mark) => (
						<AxisLabel key={mark.row} x={WEEKDAY_LABEL_X} y={mark.y} anchor="end">
							{mark.label}
						</AxisLabel>
					))}
					{cellMarks.map(({ cell, position }) => (
						<CalendarCell
							key={cell.date}
							x={position.x}
							y={position.y}
							size={sizing.cell}
							fill={heatColor(cell.intensity, OUTFLOW_COLOR)}
							active={hoveredCell?.date === cell.date}
							label={`${cell.date}: ${formatAmount(cell.outflow)}`}
							onHover={(hovered) => { hoverCell(cell, hovered); }}
							onSelect={() => { onSelectDay(cell.date); }}
						/>
					))}
				</Group>
			</svg>
			<ShowOnHoverAt target={hoveredCell} at={tooltipAnchor}>
				{(day, anchor) => (
					<ChartTooltip top={anchor.top} left={anchor.left}>
						<CalendarTooltipContent day={day} currency={currency} />
					</ChartTooltip>
				)}
			</ShowOnHoverAt>
		</div>
	);
};

SpendingCalendarPlot.displayName = 'SpendingCalendarPlot';

export { SpendingCalendarPlot };
export type { SpendingCalendarPlotProps };
