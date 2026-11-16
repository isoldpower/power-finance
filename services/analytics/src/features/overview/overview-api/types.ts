import type { MoneyDto } from "@internal/shared";
import type {
	AnalyticsMetaDto,
	AnalyticsParamsDto,
	CategoryRefDto,
	TransactionBriefDto,
} from "@feature/filters/ledger-api";


interface TopCategoryDto {
	category: CategoryRefDto | null;
	amount: MoneyDto;
	share: number;
}

interface PeriodSummaryDto {
	since: string;
	until: string;
	inflow: MoneyDto;
	outflow: MoneyDto;
	net: MoneyDto;
	savings_rate: number | null;
	transactions_count: number;
	active_days: number;
	average_daily_outflow: MoneyDto;
	largest_expense: TransactionBriefDto | null;
	largest_income: TransactionBriefDto | null;
	top_expense_category: TopCategoryDto | null;
}

interface OverviewDto {
	current: PeriodSummaryDto;
	previous: PeriodSummaryDto;
}

type OverviewParamsDto = AnalyticsParamsDto;

type OverviewMetaDto = AnalyticsMetaDto;

export type { OverviewDto, OverviewMetaDto, OverviewParamsDto, PeriodSummaryDto, TopCategoryDto };
