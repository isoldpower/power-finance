import type { Period } from "@entity/metrics";


const PERIODS = [
	'1W',
	'1M',
	'3M',
	'1Y',
] as const satisfies readonly Period[];

export { PERIODS };
