import type { Granularity } from "@entity/filters";
import type { CashFlowMode } from "@entity/flow";
import type { SegmentedOption } from "@shared/charts";


const GRANULARITY_LABELS: SegmentedOption<Granularity>[] = [
	{ value: 'day', label: 'D' },
	{ value: 'week', label: 'W' },
	{ value: 'month', label: 'M' },
];

const CASH_FLOW_MODES: SegmentedOption<CashFlowMode>[] = [
	{ value: 'bars', label: 'Bars' },
	{ value: 'balance', label: 'Balance' },
];

export { CASH_FLOW_MODES, GRANULARITY_LABELS };
