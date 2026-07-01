import type { IStorage } from "@internal/shared";
import { LocalStorageMock } from "@internal/shared";

import type {
	ISummaryRESTApiClient,
	InsightsGetRequest,
	InsightsGetResponse,
	LedgerBalanceGetResponse,
	NetWorthInsight,
	CashFlowInsight,
	SeriesPoint,
} from "../types.ts";

const MOCK_DELAY_MS = 250;

const delay = <T>(value: T): Promise<T> =>
	new Promise((resolve) => setTimeout(() => { resolve(value); }, MOCK_DELAY_MS));

// Mirrors the FX mock: units of currency per 1 USD.
const USD_RATES: Record<string, number> = {
	USD: 1,
	EUR: 0.92,
	GBP: 0.79,
	JPY: 156,
};

const toUsd = (amount: number, currency: string): number => amount / (USD_RATES[currency] ?? 1);

const round2 = (value: number): number => Math.round(value * 100) / 100;

const RANGE_DAYS: Record<string, number> = {
	'1W': 7,
	'1M': 30,
	'3M': 91,
	'1Y': 365,
};

const DAY_MS = 24 * 60 * 60 * 1000;
const SERIES_POINTS = 10;

interface StoredWallet {
	id: string;
	balance: { amount: number; currency: string };
	credit: boolean;
}

interface StoredTransaction {
	id: string;
	source_wallet_id: string;
	amount: string;
	created_at: string;
}

interface LedgerEntry {
	time: number;
	usd: number;
}

// Wallets + transactions are the source of truth; everything the dashboard shows is
// derived from them so it stays in sync once those queries are re-fetched.
class SummaryMockRESTApiClient implements ISummaryRESTApiClient {
	private readonly wallets: IStorage<StoredWallet>;
	private readonly transactions: IStorage<StoredTransaction>;

	constructor() {
		this.wallets = new LocalStorageMock<StoredWallet>('wallets');
		this.transactions = new LocalStorageMock<StoredTransaction>('transactions');
	}

	// Sum of wallet opening balances, converted to USD — net worth before any transaction.
	private baselineUsd(): number {
		return this.wallets.list().reduce((sum, wallet) => sum + toUsd(wallet.balance.amount, wallet.balance.currency), 0);
	}

	// Each transaction's signed USD delta (in its wallet's currency), sorted by time.
	private ledgerEntries(): LedgerEntry[] {
		const currencyByWallet = new Map(this.wallets.list().map((wallet) => [wallet.id, wallet.balance.currency]));
		return this.transactions.list()
			.map((txn) => ({
				time: new Date(txn.created_at).getTime(),
				usd: toUsd(parseFloat(txn.amount) || 0, currencyByWallet.get(txn.source_wallet_id) ?? 'USD'),
			}))
			.sort((a, b) => a.time - b.time);
	}

	// Live USD balance per wallet (opening + its transactions), for assets/liabilities.
	private liveBalancesUsd(): number[] {
		const entries = this.transactions.list();
		return this.wallets.list().map((wallet) => {
			const delta = entries.reduce(
				(sum, txn) => txn.source_wallet_id === wallet.id ? sum + (parseFloat(txn.amount) || 0) : sum,
				0
			);
			return toUsd(wallet.balance.amount + delta, wallet.balance.currency);
		});
	}

	private netWorthFor(range: string): NetWorthInsight {
		const baseline = this.baselineUsd();
		const entries = this.ledgerEntries();
		const totalDelta = entries.reduce((sum, entry) => sum + entry.usd, 0);
		const current = baseline + totalDelta;

		const days = RANGE_DAYS[range] ?? RANGE_DAYS['1M'];
		const now = Date.now();
		const sumUpTo = (cutoff: number): number =>
			baseline + entries.reduce((sum, entry) => entry.time <= cutoff ? sum + entry.usd : sum, 0);

		const series: SeriesPoint[] = Array.from({ length: SERIES_POINTS }, (_, index) => {
			const progress = index / (SERIES_POINTS - 1);
			const time = now - days * (1 - progress) * DAY_MS;
			const value = index === SERIES_POINTS - 1 ? current : sumUpTo(time);
			return { t: new Date(time).toISOString(), v: round2(value) };
		});

		const start = series[0].v;
		const pct = start !== 0 ? round2(((current - start) / Math.abs(start)) * 100) : 0;

		return {
			value: { amount: round2(current), currency: 'USD' },
			change: { pct: Math.abs(pct), direction: current >= start ? 'up' : 'down' },
			series,
		};
	}

	private cashFlowFor(range: string): CashFlowInsight {
		const days = RANGE_DAYS[range] ?? RANGE_DAYS['1M'];
		const cutoff = Date.now() - days * DAY_MS;
		let income = 0;
		let expenses = 0;
		for (const entry of this.ledgerEntries()) {
			if (entry.time < cutoff) continue;
			if (entry.usd >= 0) income += entry.usd; else expenses += -entry.usd;
		}
		const net = income - expenses;

		return {
			in: { amount: round2(income), currency: 'USD' },
			out: { amount: round2(expenses), currency: 'USD' },
			net: { amount: round2(net), currency: 'USD' },
			savingsRate: income > 0 ? net / income : 0,
			range,
		};
	}

	public getInsights(request: InsightsGetRequest): Promise<InsightsGetResponse> {
		const range = request.params.range ?? '1M';
		const response: InsightsGetResponse = {};
		if (request.params.metrics.includes('net_worth')) response.net_worth = this.netWorthFor(range);
		if (request.params.metrics.includes('cash_flow')) response.cash_flow = this.cashFlowFor(range);

		return delay(response);
	}

	public getLedgerBalance(): Promise<LedgerBalanceGetResponse> {
		const balances = this.liveBalancesUsd();
		const assets = balances.reduce((sum, value) => value > 0 ? sum + value : sum, 0);
		const liabilities = balances.reduce((sum, value) => value < 0 ? sum - value : sum, 0);

		return delay({
			assets: { amount: round2(assets), currency: 'USD' },
			liabilities: { amount: round2(liabilities), currency: 'USD' },
			equity: { amount: round2(assets - liabilities), currency: 'USD' },
			balanced: true,
		});
	}
}

export { SummaryMockRESTApiClient };
