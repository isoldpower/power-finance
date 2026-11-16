import type { MoneyDto } from "@internal/shared";
import type {
	AnalyticsMetaDto,
	AnalyticsParamsDto,
	CategoryRefDto,
	GranularityDto,
	LedgerSideDto,
} from "@feature/filters/ledger-api";


interface CategoryShareDto {
	category: CategoryRefDto | null;
	amount: MoneyDto;
	share: number;
	transactions_count: number;
	average: MoneyDto;
	previous_amount: MoneyDto;
	change_percentage: number | null;
}

interface CategoryBreakdownDto {
	type: LedgerSideDto;
	total: MoneyDto;
	categories: CategoryShareDto[];
}

interface BucketRangeDto {
	start: string;
	end: string;
}

type CategorySeriesKindDto = 'category' | 'other';

interface CategorySeriesDto {
	key: string;
	category: CategoryRefDto | null;
	kind: CategorySeriesKindDto;
	total: MoneyDto;
	points: MoneyDto[];
}

interface CategoryTrendsDto {
	type: LedgerSideDto;
	buckets: BucketRangeDto[];
	series: CategorySeriesDto[];
}

interface CategoryBreakdownParamsDto extends AnalyticsParamsDto {
	type?: LedgerSideDto;
	category?: string[];
}

interface CategoryTrendsParamsDto extends CategoryBreakdownParamsDto {
	granularity?: GranularityDto;
	limit?: number;
}

type CategoryBreakdownMetaDto = AnalyticsMetaDto;

interface CategoryTrendsMetaDto extends AnalyticsMetaDto {
	granularity: GranularityDto;
}

export type {
	BucketRangeDto,
	CategoryBreakdownDto,
	CategoryBreakdownMetaDto,
	CategoryBreakdownParamsDto,
	CategorySeriesDto,
	CategorySeriesKindDto,
	CategoryShareDto,
	CategoryTrendsDto,
	CategoryTrendsMetaDto,
	CategoryTrendsParamsDto,
};
