import { LocalStorageMock } from "@internal/shared";
import { delay, parseAmount, serializeAmount } from "@shared/api";
import { CURRENCY_CATALOG } from "@feature/localization/currencies-api";
import { TRANSACTIONS_STORAGE_KEY, walletDelta } from "@feature/transactions/transactions-api";
import { WALLETS_STORAGE_KEY } from "@feature/wallets/wallets-api";
import { GOALS_STORAGE_KEY } from "@feature/wallets/goals-api";
import type { IStorage } from "@internal/shared";
import type { MoneyDto } from "@shared/api";
import type { StoredTransaction } from "@feature/transactions/transactions-api";
import type { StoredWallet } from "@feature/wallets/wallets-api";
import type { StoredGoal } from "@feature/wallets/goals-api";
import type { NetDiffDirectionDto, NetWorthPointDto } from "../types.ts";
import type {
	BalanceMetricsRequest, BalanceMetricsResponse,
	CashFlowRequest, CashFlowResponse,
	IMetricsRESTApiClient,
	NetWorthRequest, NetWorthResponse,
} from "./types.ts";

const PREFERRED_CURRENCY = 'USD';
const DEFAULT_SERIES_POINTS = 10;
const DEFAULT_WINDOW_DAYS = 30;
const DAY_IN_MS = 24 * 60 * 60 * 1000;
const FLAT_THRESHOLD = 0.01;

interface LedgerPoint {
	time: number;
	usd: number;
}

const usdRate = (currency: string): number => {
	return CURRENCY_CATALOG.find((entry) => entry.code === currency)?.usdRate ?? 1;
};

const toUsd = (amount: number, currency: string): number => amount / usdRate(currency);

const money = (amount: number): MoneyDto => ({
	amount: serializeAmount(amount),
	currency: PREFERRED_CURRENCY,
});

const direction = (current: number, start: number): NetDiffDirectionDto => {
	if (Math.abs(current - start) < FLAT_THRESHOLD) return 'flat';

	return current > start ? 'up' : 'down';
};

class MetricsMockRESTApiClient implements IMetricsRESTApiClient {
	private readonly wallets: IStorage<StoredWallet>;
	private readonly goals: IStorage<StoredGoal>;
	private readonly transactions: IStorage<StoredTransaction>;

	constructor() {
		this.wallets = new LocalStorageMock<StoredWallet>(WALLETS_STORAGE_KEY);
		this.goals = new LocalStorageMock<StoredGoal>(GOALS_STORAGE_KEY);
		this.transactions = new LocalStorageMock<StoredTransaction>(TRANSACTIONS_STORAGE_KEY);
	}

	private settled(): StoredTransaction[] {
		return this.transactions.list().filter((item) => item.deleted_at === null);
	}

	private baselineUsd(): number {
		return this.wallets.list()
			.filter((wallet) => wallet.deleted_at === null)
			.reduce((sum, wallet) => sum + toUsd(parseAmount(wallet.opening_balance), wallet.currency), 0);
	}

	private ledger(): LedgerPoint[] {
		return this.settled()
			.map((item) => ({
				time: new Date(item.created_at).getTime(),
				usd: toUsd(walletDelta(item), item.currency),
			}))
			.sort((left, right) => left.time - right.time);
	}

	private holderBalancesUsd(): number[] {
		const settled = this.settled();
		const deltaFor = (holderId: string): number => settled
			.filter((item) => item.wallet_id === holderId)
			.reduce((sum, item) => sum + walletDelta(item), 0);

		const wallets = this.wallets.list()
			.filter((wallet) => wallet.deleted_at === null)
			.map((wallet) => toUsd(parseAmount(wallet.opening_balance) + deltaFor(wallet.id), wallet.currency));
		const goals = this.goals.list()
			.filter((goal) => goal.deleted_at === null)
			.map((goal) => toUsd(deltaFor(goal.id), goal.currency));

		return [...wallets, ...goals];
	}

	public async balance(_payload: BalanceMetricsRequest): Promise<BalanceMetricsResponse> {
		await delay();

		const balances = this.holderBalancesUsd();
		const assets = balances.reduce((sum, value) => (value > 0 ? sum + value : sum), 0);
		const liabilities = balances.reduce((sum, value) => (value < 0 ? sum - value : sum), 0);

		return {
			data: {
				assets: money(assets),
				liabilities: money(liabilities),
				equity: money(assets - liabilities),
				balanced: true,
				comments: null,
			},
			meta: { cached: false },
		};
	}

	public async netWorth(payload: NetWorthRequest): Promise<NetWorthResponse> {
		await delay();

		const points = payload.params?.points ?? DEFAULT_SERIES_POINTS;
		const since = payload.params?.since ?? null;
		const ledger = this.ledger();
		const baseline = this.baselineUsd();
		const current = baseline + ledger.reduce((sum, entry) => sum + entry.usd, 0);
		const now = Date.now();
		const from = since ? new Date(since).getTime() : now - DEFAULT_WINDOW_DAYS * DAY_IN_MS;
		const span = Math.max(now - from, DAY_IN_MS);
		const valueAt = (cutoff: number): number => baseline
			+ ledger.reduce((sum, entry) => (entry.time <= cutoff ? sum + entry.usd : sum), 0);

		const series: NetWorthPointDto[] = Array.from({ length: Math.max(points, 1) }, (_, index) => {
			const progress = points > 1 ? index / (points - 1) : 1;
			const time = from + span * progress;

			return { timestamp: new Date(time).toISOString(), money: money(valueAt(time)) };
		});

		const start = parseAmount(series[0].money.amount);
		const percentage = start !== 0 ? Math.abs(((current - start) / Math.abs(start)) * 100) : 0;

		return {
			data: {
				money: money(current),
				net_diff: {
					percentage: Math.round(percentage * 100) / 100,
					direction: direction(current, start),
				},
				series,
			},
			meta: { since, points, cached: false },
		};
	}

	public async cashFlow(payload: CashFlowRequest): Promise<CashFlowResponse> {
		await delay();

		const since = payload.params?.since ?? null;
		const cutoff = since ? new Date(since).getTime() : 0;
		const within = this.settled().filter((item) => new Date(item.created_at).getTime() >= cutoff);
		const sumOf = (type: StoredTransaction['type']): number => within
			.filter((item) => item.type === type)
			.reduce((sum, item) => sum + toUsd(parseAmount(item.amount), item.currency), 0);

		const inflow = sumOf('income');
		const outflow = sumOf('expense');
		const net = inflow - outflow;

		return {
			data: {
				inflow: money(inflow),
				outflow: money(outflow),
				total_net: money(net),
				savings_rate: inflow > 0 ? Math.round((net / inflow) * 10000) / 100 : 0,
			},
			meta: { since, cached: false },
		};
	}
}

export { MetricsMockRESTApiClient };
