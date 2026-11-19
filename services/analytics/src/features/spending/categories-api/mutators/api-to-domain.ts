import { moneyFromApi, optionalCategoryRefFromApi } from "@feature/filters/ledger-api";

import type { CategoryBreakdown, CategorySeries, CategoryShare, CategoryTrends } from "@entity/spending";
import type {
	CategoryBreakdownDto,
	CategorySeriesDto,
	CategoryShareDto,
	CategoryTrendsDto,
	CategoryTrendsMetaDto,
} from "../types.ts";


const categoryShareFromApi = (dto: CategoryShareDto): CategoryShare => ({
	category: optionalCategoryRefFromApi(dto.category),
	amount: moneyFromApi(dto.amount),
	share: dto.share,
	transactionsCount: dto.transactions_count,
	average: moneyFromApi(dto.average),
	previousAmount: moneyFromApi(dto.previous_amount),
	changePercentage: dto.change_percentage,
});

const categoryBreakdownFromApi = (dto: CategoryBreakdownDto): CategoryBreakdown => ({
	side: dto.type,
	total: moneyFromApi(dto.total),
	categories: dto.categories.map(categoryShareFromApi),
});

const categorySeriesFromApi = (dto: CategorySeriesDto): CategorySeries => ({
	key: dto.key,
	category: optionalCategoryRefFromApi(dto.category),
	kind: dto.kind,
	total: moneyFromApi(dto.total),
	points: dto.points.map(moneyFromApi),
});

const categoryTrendsFromApi = (dto: CategoryTrendsDto, meta: CategoryTrendsMetaDto): CategoryTrends => ({
	side: dto.type,
	buckets: dto.buckets.map((bucket) => ({ 
		since: bucket.start,
		until: bucket.end 
	})),
	series: dto.series.map(categorySeriesFromApi),
	granularity: meta.granularity,
});

export { categoryBreakdownFromApi, categoryShareFromApi, categoryTrendsFromApi };
