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
	percentage: number;
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
	savings_rate: number;
}

interface NetWorthParams {
	since?: string;
	points?: number;
}

interface CashFlowParams {
	since?: string;
}

export type {
	BalanceMetricsDto,
	CashFlowDto,
	CashFlowParams,
	NetDiffDto,
	NetDiffDirectionDto,
	NetWorthDto,
	NetWorthParams,
	NetWorthPointDto,
};
