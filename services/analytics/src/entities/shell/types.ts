type AnalyticsTabKey = 'overview' | 'spending' | 'flow';

interface AnalyticsTab {
	key: AnalyticsTabKey;
	label: string;
	hint: string;
}

interface Money {
	amount: string;
	currency: string;
}

export type { AnalyticsTab, AnalyticsTabKey, Money };
