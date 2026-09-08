import { moneyFromApi } from "@feature/localization/currencies-api";

import type { BalanceMetrics, CashFlow, Metrics, NetWorth } from "@entity/metrics";
import type { BalanceMetricsDto, CashFlowDto, MetricsDto, NetWorthDto } from "../types.ts";


const balanceMetricsFromApi = (dto: BalanceMetricsDto): BalanceMetrics => ({
	assets: moneyFromApi(dto.assets),
	liabilities: moneyFromApi(dto.liabilities),
	equity: moneyFromApi(dto.equity),
	balanced: dto.balanced,
	comments: dto.comments,
});

const netWorthFromApi = (dto: NetWorthDto): NetWorth => ({
	money: moneyFromApi(dto.money),
	netDiff: { 
		percentage: dto.net_diff.percentage,
		direction: dto.net_diff.direction,
	},
	series: dto.series.map((point) => ({
		timestamp: point.timestamp,
		money: moneyFromApi(point.money),
	})),
});

const cashFlowFromApi = (dto: CashFlowDto): CashFlow => ({
	inflow: moneyFromApi(dto.inflow),
	outflow: moneyFromApi(dto.outflow),
	totalNet: moneyFromApi(dto.total_net),
	savingsRate: dto.savings_rate,
});

const metricsFromApi = (dto: MetricsDto): Metrics => ({
	balance: dto.balance === null ? null : balanceMetricsFromApi(dto.balance),
	netWorth: dto.net_worth === null ? null : netWorthFromApi(dto.net_worth),
	cashFlow: dto.cash_flow === null ? null : cashFlowFromApi(dto.cash_flow),
});

export { balanceMetricsFromApi, cashFlowFromApi, metricsFromApi, moneyFromApi, netWorthFromApi };
