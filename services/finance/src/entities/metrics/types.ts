import type { Money } from "@entity/localization";


type Period = '1W' | '1M' | '3M' | '1Y';

interface SparklinePoint {
	xPct: number;
	yPct: number;
}

type NetDiffDirection = 'up' | 'down' | 'flat';

type NetDiffSign = '+' | '−';

interface NetDiff {
	percentage: number | null;
	direction: NetDiffDirection;
}

interface NetWorthPoint {
	timestamp: string;
	money: Money;
}

interface NetWorth {
	money: Money;
	netDiff: NetDiff;
	series: NetWorthPoint[];
}

interface CashFlow {
	inflow: Money;
	outflow: Money;
	totalNet: Money;
	savingsRate: number | null;
}

interface BalanceMetrics {
	assets: Money;
	liabilities: Money;
	equity: Money;
	balanced: boolean;
	comments: string | null;
}

interface Metrics {
	balance: BalanceMetrics | null;
	netWorth: NetWorth | null;
	cashFlow: CashFlow | null;
}

export type { Period, SparklinePoint };
export type {
	BalanceMetrics,
	CashFlow,
	Metrics,
	NetDiff,
	NetDiffDirection,
	NetDiffSign,
	NetWorth,
	NetWorthPoint,
};
