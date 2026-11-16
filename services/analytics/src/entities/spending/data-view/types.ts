import type { CategoryRef } from "../types.ts";


interface BreakdownSlice {
	key: string;
	category: CategoryRef | null;
	label: string;
	value: number;
	share: number;
	previousValue: number;
	changePercentage: number | null;
	transactionsCount: number;
	isOther: boolean;
}

interface TrendRow {
	index: number;
	start: string;
	values: Record<string, number>;
}

interface TrendLayer {
	key: string;
	category: CategoryRef | null;
	label: string;
	total: number;
	isOther: boolean;
}

interface TrendsView {
	rows: TrendRow[];
	layers: TrendLayer[];
}

interface CalendarCellView {
	date: string;
	week: number;
	weekday: number;
	outflow: number;
	inflow: number;
	count: number;
	intensity: number;
}

interface CalendarMonthMark {
	week: number;
	month: string;
}

interface CalendarGrid {
	cells: CalendarCellView[];
	months: CalendarMonthMark[];
	weeks: number;
	peak: number;
}

interface RhythmBin {
	bin: number;
	count: number;
	transactions: number;
}

interface RhythmColumn {
	bin: number;
	bins: RhythmBin[];
}

interface RhythmGrid {
	columns: RhythmColumn[];
	peak: number;
}

export type {
	BreakdownSlice,
	CalendarCellView,
	CalendarGrid,
	CalendarMonthMark,
	RhythmBin,
	RhythmColumn,
	RhythmGrid,
	TrendLayer,
	TrendRow,
	TrendsView,
};
