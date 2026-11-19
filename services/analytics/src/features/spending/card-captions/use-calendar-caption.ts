import { useMemo } from "react";
import { useMoneyFormat } from "@shared/formatting";
import { CALENDAR_CLAMPED_CAPTION, CALENDAR_DEFAULT_CAPTION } from "./config.ts";

import type { SpendingCalendar } from "@entity/spending";


const useCalendarCaption = (calendar: SpendingCalendar | undefined, clamped: boolean): string[] => {
	const formatMoney = useMoneyFormat();

	return useMemo(() => {
		const summary = calendar
			? `Busiest day: ${formatMoney(calendar.peakOutflow)}`
			: CALENDAR_DEFAULT_CAPTION;

		return clamped ? [summary, CALENDAR_CLAMPED_CAPTION] : [summary];
	}, [calendar, clamped, formatMoney]);
};

export { useCalendarCaption };
