import type { SurplusMode } from "@entity/flow";
import type { SegmentedOption } from "@shared/charts";


const SURPLUS_MODES: SegmentedOption<SurplusMode>[] = [
	{ value: 'threshold', label: 'Threshold' },
	{ value: 'lines', label: 'Lines' },
];

export { SURPLUS_MODES };
