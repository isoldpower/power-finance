import { useAnalyticsQuery } from "@feature/filters";
import { CalendarCardFx, useCalendarCaption, useSpendingCalendar } from "@feature/spending";
import { useOpenDayDrill } from "@feature/transactions";
import { PatternsHeatLegend, SpendingCalendarChart } from "@widget/spending";
import { ChartCard } from "@shared/charts";
import { DotList } from "@shared/text";

import type { FC } from "react";


interface CalendarCardWithFxProps {
	className?: string;
}

const CalendarCardWithFx: FC<CalendarCardWithFxProps> = ({ className }) => {
	const query = useAnalyticsQuery();
	const { calendar, clamped, isPending, isError } = useSpendingCalendar(query);
	const caption = useCalendarCaption(calendar, clamped);
	const handleSelectDay = useOpenDayDrill();

	return (
		<ChartCard className={className}>
			<ChartCard.Header>
				<div>
					<ChartCard.Title>
						Spending calendar
					</ChartCard.Title>
					<ChartCard.Caption>
						<DotList>
							{caption}
						</DotList>
					</ChartCard.Caption>
				</div>
				<PatternsHeatLegend />
			</ChartCard.Header>
			<CalendarCardFx
				isPending={isPending}
				isError={isError}
				calendar={calendar}
			>
				{(loaded) => (
					<SpendingCalendarChart
						calendar={loaded}
						currency={query.currency}
						onSelectDay={handleSelectDay}
					/>
				)}
			</CalendarCardFx>
		</ChartCard>
	);
};

CalendarCardWithFx.displayName = 'CalendarCardWithFx';

export { CalendarCardWithFx };
export type { CalendarCardWithFxProps };
