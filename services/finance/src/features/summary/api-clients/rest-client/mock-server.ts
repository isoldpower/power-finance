import type {
	ISummaryRESTApiClient,
	InsightsGetRequest,
	InsightsGetResponse,
	LedgerBalanceGetRequest,
	LedgerBalanceGetResponse,
	NetWorthInsight,
	CashFlowInsight,
} from "../types.ts";

const MOCK_DELAY_MS = 250;

const delay = <T>(value: T): Promise<T> =>
	new Promise((resolve) => setTimeout(() => { resolve(value); }, MOCK_DELAY_MS));

const NET_WORTH_VALUE = 18240.30;

const RANGE_PCT: Record<string, number> = {
	'1W': 0.6,
	'1M': 2.4,
	'3M': 6.1,
	'1Y': 14.2,
};

const netWorthFor = (range: string): NetWorthInsight => {
	const pct = RANGE_PCT[range] ?? RANGE_PCT['1M'];
	const start = NET_WORTH_VALUE / (1 + pct / 100);
	const points = 10;
	const series = Array.from({ length: points }, (_, index) => {
		const t = index / (points - 1);
		const trend = start + (NET_WORTH_VALUE - start) * t;
		const wave = Math.sin(t * Math.PI * 1.5) * (NET_WORTH_VALUE - start) * 0.18;
		return { t: String(index), v: Math.round((trend + wave) * 100) / 100 };
	});
	series[series.length - 1] = { t: String(points - 1), v: NET_WORTH_VALUE };

	return {
		value: { amount: NET_WORTH_VALUE, currency: 'USD' },
		change: { pct, direction: 'up' },
		series,
	};
};

const CASH_FLOW_RANGE: Record<string, { in: number; out: number }> = {
	'1W': { in: 1720.00, out: 720.40 },
	'1M': { in: 7420.00, out: 3020.10 },
	'3M': { in: 21850.00, out: 9180.30 },
	'1Y': { in: 84200.00, out: 37120.50 },
};

const cashFlowFor = (range: string): CashFlowInsight => {
	const totals = CASH_FLOW_RANGE[range] ?? CASH_FLOW_RANGE['1M'];
	const net = totals.in - totals.out;

	return {
		in: { amount: totals.in, currency: 'USD' },
		out: { amount: totals.out, currency: 'USD' },
		net: { amount: net, currency: 'USD' },
		savingsRate: totals.in > 0 ? net / totals.in : 0,
		range,
	};
};

class SummaryMockRESTApiClient implements ISummaryRESTApiClient {
	public getInsights(request: InsightsGetRequest): Promise<InsightsGetResponse> {
		const response: InsightsGetResponse = {};
		if (request.params.metrics.includes('net_worth')) response.net_worth = netWorthFor(request.params.range ?? '1M');
		if (request.params.metrics.includes('cash_flow')) response.cash_flow = cashFlowFor(request.params.range ?? '1M');

		return delay(response);
	}

	public getLedgerBalance(_request: LedgerBalanceGetRequest): Promise<LedgerBalanceGetResponse> {
		return delay({
			assets: { amount: 18880.50, currency: 'USD' },
			liabilities: { amount: 640.20, currency: 'USD' },
			equity: { amount: 18240.30, currency: 'USD' },
			balanced: true,
		});
	}
}

export { SummaryMockRESTApiClient };
