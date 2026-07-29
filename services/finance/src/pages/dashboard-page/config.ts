import type { Period } from "@entity/metrics";


const PERIODS = ['1W', '1M', '3M', '1Y'] as const satisfies readonly Period[];

const NET_WORTH_RANGE_LABELS: Record<string, string> = {
	'1W': 'vs last week',
	'1M': 'vs last 30 days',
	'3M': 'vs last quarter',
	'1Y': 'vs last year',
};

const CASH_FLOW_RANGE_LABELS: Record<string, string> = {
	'1W': 'This week',
	'1M': 'This month',
	'3M': 'This quarter',
	'1Y': 'This year',
};

export { PERIODS, NET_WORTH_RANGE_LABELS, CASH_FLOW_RANGE_LABELS };
