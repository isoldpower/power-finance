import { ChartMessage, ChartSkeleton } from "@shared/charts";
import { QueryFx } from "@shared/feedback";

import type { FC, ReactNode } from "react";
import type { SpendingCalendar } from "@entity/spending";


interface CalendarCardFxProps {
	isPending: boolean;
	isError: boolean;
	calendar: SpendingCalendar | undefined;
	children: (calendar: SpendingCalendar) => ReactNode;
}

const SKELETON_BARS = 12;
const PLACEHOLDER_HEIGHT = 160;

const CalendarCardFx: FC<CalendarCardFxProps> = ({ isPending, isError, calendar, children }) => (
	<QueryFx
		isPending={isPending}
		isError={isError}
		data={calendar}
		pending={<ChartSkeleton height={PLACEHOLDER_HEIGHT} bars={SKELETON_BARS} />}
		error={<ChartMessage height={PLACEHOLDER_HEIGHT} title="Couldn’t load the calendar" />}
	>
		{children}
	</QueryFx>
);

CalendarCardFx.displayName = 'CalendarCardFx';

export { CalendarCardFx };
export type { CalendarCardFxProps };
