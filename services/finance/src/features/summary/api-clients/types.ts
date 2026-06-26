interface Money {
	amount: number;
	currency: string;
}

interface InsightChange {
	pct: number;
	direction: 'up' | 'down';
}

interface SeriesPoint {
	t: string;
	v: number;
}

interface NetWorthInsight {
	value: Money;
	change: InsightChange;
	series: SeriesPoint[];
}

interface CashFlowInsight {
	in: Money;
	out: Money;
	net: Money;
	savingsRate: number;
	range: string;
}

type InsightMetric = 'net_worth' | 'cash_flow';

interface Insights {
	net_worth?: NetWorthInsight;
	cash_flow?: CashFlowInsight;
}

interface LedgerBalance {
	assets: Money;
	liabilities: Money;
	equity: Money;
	balanced: boolean;
}

interface InsightsGetRequest {
	params: {
		metrics: InsightMetric[];
		range?: string;
	};
}

type InsightsGetResponse = Insights;

interface LedgerBalanceGetRequest {
	params?: object;
}

type LedgerBalanceGetResponse = LedgerBalance;

interface ISummaryRESTApiClient {
	getInsights: (request: InsightsGetRequest) => Promise<InsightsGetResponse>;
	getLedgerBalance: (request: LedgerBalanceGetRequest) => Promise<LedgerBalanceGetResponse>;
}

export type {
	Money,
	InsightChange,
	SeriesPoint,
	NetWorthInsight,
	CashFlowInsight,
	InsightMetric,
	Insights,
	LedgerBalance,
	InsightsGetRequest,
	InsightsGetResponse,
	LedgerBalanceGetRequest,
	LedgerBalanceGetResponse,
	ISummaryRESTApiClient,
};
