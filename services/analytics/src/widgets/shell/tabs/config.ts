import type { AnalyticsTab } from "@entity/shell";


const ANALYTICS_TABS: AnalyticsTab[] = [
	{ key: 'overview', label: 'Overview', hint: 'Headline numbers, cash flow, pace' },
	{ key: 'spending', label: 'Spending', hint: 'Categories, merchants, habits' },
	{ key: 'flow', label: 'Flow', hint: 'Money flow, balances, surplus' },
];

export { ANALYTICS_TABS };
