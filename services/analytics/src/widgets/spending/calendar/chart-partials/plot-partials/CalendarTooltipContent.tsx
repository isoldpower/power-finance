import { ChartTooltip, INFLOW_COLOR, OUTFLOW_COLOR } from "@shared/charts";
import { useAmountFormat, useDateFormat } from "@shared/formatting";
import { MIDDAY_SUFFIX } from "./config.ts";

import type { FC } from "react";
import type { CalendarCellView } from "@entity/spending";


interface CalendarTooltipContentProps {
	day: CalendarCellView;
	currency: string;
}

const CalendarTooltipContent: FC<CalendarTooltipContentProps> = ({ day, currency }) => {
	const formatAmount = useAmountFormat(currency);
	const { formatDay } = useDateFormat();
	const title = formatDay(`${day.date}${MIDDAY_SUFFIX}`);

	return (
		<>
			<ChartTooltip.Title>
				{title}
			</ChartTooltip.Title>
			<ChartTooltip.Row color={OUTFLOW_COLOR} label="Spent">
				{formatAmount(day.outflow)}
			</ChartTooltip.Row>
			<ChartTooltip.Row color={INFLOW_COLOR} label="Earned">
				{formatAmount(day.inflow)}
			</ChartTooltip.Row>
			<ChartTooltip.Row label="Transactions">
				{day.count.toString()}
			</ChartTooltip.Row>
		</>
	);
};

CalendarTooltipContent.displayName = 'CalendarTooltipContent';

export { CalendarTooltipContent };
export type { CalendarTooltipContentProps };
