import type { MoneyDto } from "@internal/shared";
import type { AnalyticsMetaDto, AnalyticsParamsDto, LedgerSideDto } from "@feature/filters/ledger-api";


interface CalendarDayDto {
	date: string;
	inflow: MoneyDto;
	outflow: MoneyDto;
	net: MoneyDto;
	transactions_count: number;
}

interface SpendingCalendarDto {
	days: CalendarDayDto[];
	peak_outflow: MoneyDto;
}

interface RhythmCellDto {
	weekday: number;
	hour: number;
	amount: MoneyDto;
	transactions_count: number;
}

interface RhythmPeakDto {
	weekday: number;
	hour: number;
	amount: MoneyDto;
}

interface SpendingRhythmDto {
	type: LedgerSideDto;
	cells: RhythmCellDto[];
	peak: RhythmPeakDto | null;
}

type SpendingCalendarParamsDto = AnalyticsParamsDto;

interface SpendingRhythmParamsDto extends AnalyticsParamsDto {
	type?: LedgerSideDto;
}

type PatternsMetaDto = AnalyticsMetaDto;

export type {
	CalendarDayDto,
	PatternsMetaDto,
	RhythmCellDto,
	RhythmPeakDto,
	SpendingCalendarDto,
	SpendingCalendarParamsDto,
	SpendingRhythmDto,
	SpendingRhythmParamsDto,
};
