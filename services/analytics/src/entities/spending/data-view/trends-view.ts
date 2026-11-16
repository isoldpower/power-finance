import { parseAmount } from "@internal/shared";
import { categoryLabel, OTHER_LABEL } from "../category-label";

import type { CategoryTrends } from "../types.ts";
import type { TrendsView } from "./types.ts";


const toTrendsView = (trends: CategoryTrends): TrendsView => ({
	layers: trends.series.map((series) => ({
		key: series.key,
		category: series.category,
		label: series.kind === 'other' 
			? OTHER_LABEL 
			: categoryLabel(series.category),
		total: parseAmount(series.total.amount),
		isOther: series.kind === 'other',
	})),
	rows: trends.buckets.map((bucket, index) => ({
		index,
		start: bucket.since,
		values: Object.fromEntries(trends.series.map((series) => [
			series.key,
			parseAmount(series.points[index].amount)
		])),
	})),
});

export { toTrendsView };
