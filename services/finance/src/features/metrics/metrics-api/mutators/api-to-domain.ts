import { parseAmount } from "@shared/api";
import type { MoneyDto } from "@shared/api";
import type { Money } from "@entity/localization";
import type { BalanceMetrics, CashFlow, NetWorth } from "@entity/metrics";
import type { BalanceMetricsDto, CashFlowDto, NetWorthDto } from "../types.ts";

const moneyFromApi = (dto: MoneyDto): Money => ({
	amount: parseAmount(dto.amount),
	currency: dto.currency,
});

const balanceMetricsFromApi = (dto: BalanceMetricsDto): BalanceMetrics => ({
	assets: moneyFromApi(dto.assets),
	liabilities: moneyFromApi(dto.liabilities),
	equity: moneyFromApi(dto.equity),
	balanced: dto.balanced,
	comments: dto.comments,
});

const netWorthFromApi = (dto: NetWorthDto): NetWorth => ({
	money: moneyFromApi(dto.money),
	netDiff: { percentage: dto.net_diff.percentage, direction: dto.net_diff.direction },
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

export { balanceMetricsFromApi, cashFlowFromApi, moneyFromApi, netWorthFromApi };
