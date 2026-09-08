import type { MoneyDto } from "@shared/api";


type NetDiffDirectionDto = 'up' | 'down' | 'flat';

interface BalanceMetricsDto {
	assets: MoneyDto;
	liabilities: MoneyDto;
	equity: MoneyDto;
	balanced: boolean;
	comments: string | null;
}

interface NetDiffDto {
	percentage: number | null;
	direction: NetDiffDirectionDto;
}

interface NetWorthPointDto {
	timestamp: string;
	money: MoneyDto;
}

interface NetWorthDto {
	money: MoneyDto;
	net_diff: NetDiffDto;
	series: NetWorthPointDto[];
}

interface CashFlowDto {
	inflow: MoneyDto;
	outflow: MoneyDto;
	total_net: MoneyDto;
	savings_rate: number | null;
}

interface MetricsDto {
	balance: BalanceMetricsDto | null;
	net_worth: NetWorthDto | null;
	cash_flow: CashFlowDto | null;
}

interface MetricsSections {
	balance?: boolean;
	netWorth?: boolean;
	cashFlow?: boolean;
}

interface MetricsParams {
	since?: string;
	points?: number;
}

interface MetricsQuery extends MetricsParams, MetricsSections {}

interface MetricsMetaDto {
	since: string | null;
	points: number;
	sections: string[];
	cached?: boolean;
}

const POINTS_MIN = 1;
const POINTS_MAX = 100;

export { POINTS_MAX, POINTS_MIN };
export type {
	BalanceMetricsDto,
	CashFlowDto,
	MetricsDto,
	MetricsMetaDto,
	MetricsParams,
	MetricsQuery,
	MetricsSections,
	NetDiffDto,
	NetDiffDirectionDto,
	NetWorthDto,
	NetWorthPointDto,
};
