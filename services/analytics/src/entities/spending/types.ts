import type { Money } from "@entity/shell";
import type { DateRange, Granularity, LedgerSide } from "@entity/filters";


interface CategoryRef {
	id: string;
	name: string;
	isGlobal: boolean;
}

interface CategoryShare {
	category: CategoryRef | null;
	amount: Money;
	share: number;
	transactionsCount: number;
	average: Money;
	previousAmount: Money;
	changePercentage: number | null;
}

interface CategoryBreakdown {
	side: LedgerSide;
	total: Money;
	categories: CategoryShare[];
}

type CategorySeriesKind = 'category' | 'other';

interface CategorySeries {
	key: string;
	category: CategoryRef | null;
	kind: CategorySeriesKind;
	total: Money;
	points: Money[];
}

interface CategoryTrends {
	side: LedgerSide;
	buckets: DateRange[];
	series: CategorySeries[];
	granularity: Granularity;
}

type BreakdownMode = 'donut' | 'radar' | 'radial';

type TrendsMode = 'stacked' | 'stream';

interface CalendarDay {
	date: string;
	inflow: Money;
	outflow: Money;
	net: Money;
	transactionsCount: number;
}

interface SpendingCalendar {
	days: CalendarDay[];
	peakOutflow: Money;
}

interface RhythmCell {
	weekday: number;
	hour: number;
	amount: Money;
	transactionsCount: number;
}

interface RhythmPeak {
	weekday: number;
	hour: number;
	amount: Money;
}

interface SpendingRhythm {
	side: LedgerSide;
	cells: RhythmCell[];
	peak: RhythmPeak | null;
}

export type {
	BreakdownMode,
	CalendarDay,
	CategoryBreakdown,
	CategoryRef,
	CategorySeries,
	CategorySeriesKind,
	CategoryShare,
	CategoryTrends,
	RhythmCell,
	RhythmPeak,
	SpendingCalendar,
	SpendingRhythm,
	TrendsMode,
};
