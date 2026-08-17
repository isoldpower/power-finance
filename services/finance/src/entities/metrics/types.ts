import type { Money } from "@entity/localization";


type Period = '1W' | '1M' | '3M' | '1Y';

interface SparklinePoint {
	xPct: number;
	yPct: number;
}

type NetDiffDirection = 'up' | 'down' | 'flat';

interface NetDiff {
	percentage: number;
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
	savingsRate: number;
}

interface BalanceMetrics {
	assets: Money;
	liabilities: Money;
	equity: Money;
	balanced: boolean;
	comments: string | null;
}

export type { Period, SparklinePoint };
export type { BalanceMetrics, CashFlow, NetDiff, NetDiffDirection, NetWorth, NetWorthPoint };
