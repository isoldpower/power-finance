const NET_WORTH_RANGE_LABELS: Record<string, string> = {
	'1W': 'for last week',
	'1M': 'for last 30 days',
	'3M': 'for last quarter',
	'1Y': 'for last year',
};

const rangeCodeToRelativeVerbose = (code: string): string => {
	return NET_WORTH_RANGE_LABELS[code] ?? 'for last period';
};

export { rangeCodeToRelativeVerbose };
