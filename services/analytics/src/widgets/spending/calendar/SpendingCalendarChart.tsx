import { useParentSize } from "@visx/responsive";
import { ShowOnMeasured } from "@feature/interactions";
import { SpendingCalendarPlot } from "./chart-partials/SpendingCalendarPlot.tsx";

import type { FC } from "react";
import type { SpendingCalendar } from "@entity/spending";


interface SpendingCalendarChartProps {
	calendar: SpendingCalendar;
	currency: string;
	onSelectDay: (date: string) => void;
}

const SpendingCalendarChart: FC<SpendingCalendarChartProps> = ({ calendar, currency, onSelectDay }) => {
	const { parentRef, width } = useParentSize({ debounceTime: 60, ignoreDimensions: 'height' });

	return (
		<div ref={parentRef} role="figure" aria-label="Daily spending calendar" className="w-full overflow-x-auto">
			<ShowOnMeasured width={width}>
				{(measured) => (
					<SpendingCalendarPlot
						calendar={calendar}
						width={measured}
						currency={currency}
						onSelectDay={onSelectDay}
					/>
				)}
			</ShowOnMeasured>
		</div>
	);
};

SpendingCalendarChart.displayName = 'SpendingCalendarChart';

export { SpendingCalendarChart };
export type { SpendingCalendarChartProps };
