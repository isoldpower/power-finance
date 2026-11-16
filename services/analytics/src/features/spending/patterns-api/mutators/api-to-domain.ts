import { moneyFromApi } from "@feature/filters/ledger-api";

import type { CalendarDay, RhythmCell, SpendingCalendar, SpendingRhythm } from "@entity/spending";
import type { CalendarDayDto, RhythmCellDto, SpendingCalendarDto, SpendingRhythmDto } from "../types.ts";


const calendarDayFromApi = (dto: CalendarDayDto): CalendarDay => ({
	date: dto.date,
	inflow: moneyFromApi(dto.inflow),
	outflow: moneyFromApi(dto.outflow),
	net: moneyFromApi(dto.net),
	transactionsCount: dto.transactions_count,
});

const spendingCalendarFromApi = (dto: SpendingCalendarDto): SpendingCalendar => ({
	days: dto.days.map(calendarDayFromApi),
	peakOutflow: moneyFromApi(dto.peak_outflow),
});

const rhythmCellFromApi = (dto: RhythmCellDto): RhythmCell => ({
	weekday: dto.weekday,
	hour: dto.hour,
	amount: moneyFromApi(dto.amount),
	transactionsCount: dto.transactions_count,
});

const spendingRhythmFromApi = (dto: SpendingRhythmDto): SpendingRhythm => ({
	side: dto.type,
	cells: dto.cells.map(rhythmCellFromApi),
	peak: dto.peak === null
		? null
		: { weekday: dto.peak.weekday, hour: dto.peak.hour, amount: moneyFromApi(dto.peak.amount) },
});

export { calendarDayFromApi, rhythmCellFromApi, spendingCalendarFromApi, spendingRhythmFromApi };
