import type { LedgerSide } from "@entity/filters";
import type { BreakdownMode, TrendsMode } from "@entity/spending";
import type { SegmentedOption } from "@shared/charts";


const SLICE_LIMIT = 7;

const SIDE_OPTIONS: SegmentedOption<LedgerSide>[] = [
	{ value: 'expense', label: 'Expenses' },
	{ value: 'income', label: 'Income' },
];

const BREAKDOWN_MODES: SegmentedOption<BreakdownMode>[] = [
	{ value: 'donut', label: 'Donut' },
	{ value: 'radar', label: 'Radar' },
	{ value: 'radial', label: 'Radial' },
];

const TRENDS_MODES: SegmentedOption<TrendsMode>[] = [
	{ value: 'stacked', label: 'Stacked' },
	{ value: 'stream', label: 'Stream' },
];

export { BREAKDOWN_MODES, SIDE_OPTIONS, SLICE_LIMIT, TRENDS_MODES };
