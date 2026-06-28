import type { Period, CurrencyMeta } from "@entity/dashboard";

// Selectable comparison periods for the dashboard header.
const PERIODS: readonly Period[] = ['1W', '1M', '3M', '1Y'];

// Display currencies offered in the header currency switcher.
const CURRENCIES: CurrencyMeta[] = [
	{ code: 'USD', symbol: '$', name: 'US Dollar' },
	{ code: 'EUR', symbol: '€', name: 'Euro' },
	{ code: 'GBP', symbol: '£', name: 'Br. Pound' },
	{ code: 'JPY', symbol: '¥', name: 'Yen' },
];

// Comparison-period labels for the dashboard summary cards.
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

export { PERIODS, CURRENCIES, NET_WORTH_RANGE_LABELS, CASH_FLOW_RANGE_LABELS };
