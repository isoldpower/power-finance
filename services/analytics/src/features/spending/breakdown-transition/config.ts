import type { BreakdownSlice } from "@entity/spending";


const BREAKDOWN_SLICE_TWEEN_FIELDS = [
	'value',
	'share',
	'previousValue',
] as const satisfies readonly (keyof BreakdownSlice)[];

export { BREAKDOWN_SLICE_TWEEN_FIELDS };
