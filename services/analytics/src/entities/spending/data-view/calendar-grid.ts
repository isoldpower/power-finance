import { parseAmount } from "@internal/shared";

import type { SpendingCalendar } from "../types.ts";
import type { CalendarGrid, CalendarMonthMark } from "./types.ts";


const DAYS_IN_WEEK = 7;

const localDate = (date: string): Date => {
	const [year, month, day] = date.split('-').map(Number);

	return new Date(year, month - 1, day);
};

const mondayIndex = (date: Date): number => (date.getDay() + 6) % DAYS_IN_WEEK;

const toCalendarGrid = (calendar: SpendingCalendar, monthLabel: (date: Date) => string): CalendarGrid => {
	const peak = parseAmount(calendar.peakOutflow.amount);
	const firstOffset = calendar.days.length > 0 ? mondayIndex(localDate(calendar.days[0].date)) : 0;
	const months: CalendarMonthMark[] = [];

	const cells = calendar.days.map((day, index) => {
		const date = localDate(day.date);
		const week = Math.floor((index + firstOffset) / DAYS_IN_WEEK);
		const outflow = parseAmount(day.outflow.amount);

		if (date.getDate() === 1 || index === 0) {
			months.push({ week, month: monthLabel(date) });
		}

		return {
			date: day.date,
			week,
			weekday: mondayIndex(date),
			outflow,
			inflow: parseAmount(day.inflow.amount),
			count: day.transactionsCount,
			intensity: peak > 0 ? Math.sqrt(outflow / peak) : 0,
		};
	});

	return {
		cells,
		months: months.filter((mark, index) => index === 0 || mark.week - months[index - 1].week >= 3),
		weeks: cells.length > 0 ? cells[cells.length - 1].week + 1 : 0,
		peak,
	};
};

export { toCalendarGrid };
