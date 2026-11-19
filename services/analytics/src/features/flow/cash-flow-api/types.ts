import type { MoneyDto } from "@internal/shared";
import type { AnalyticsMetaDto, AnalyticsParamsDto, GranularityDto } from "@feature/filters/ledger-api";


interface CashFlowBucketDto {
	start: string;
	end: string;
	inflow: MoneyDto;
	outflow: MoneyDto;
	net: MoneyDto;
	transactions_count: number;
	closing_balance: MoneyDto;
}

interface CashFlowTotalsDto {
	inflow: MoneyDto;
	outflow: MoneyDto;
	net: MoneyDto;
}

interface CashFlowDto {
	buckets: CashFlowBucketDto[];
	totals: CashFlowTotalsDto;
}

interface CashFlowParamsDto extends AnalyticsParamsDto {
	granularity?: GranularityDto;
	category?: string[];
}

interface CashFlowMetaDto extends AnalyticsMetaDto {
	granularity: GranularityDto;
}

export type { CashFlowBucketDto, CashFlowDto, CashFlowMetaDto, CashFlowParamsDto, CashFlowTotalsDto };
