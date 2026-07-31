const CASH_FLOW_RANGE_LABELS: Record<string, string> = {
	'1W': 'This week',
	'1M': 'This month',
	'3M': 'This quarter',
	'1Y': 'This year',
};

const rangeVerbose = (code: string) => {
	return CASH_FLOW_RANGE_LABELS[code] ?? 'This month';
}

export { rangeVerbose };