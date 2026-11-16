import { delay } from "@internal/shared";
import {
	analyticsMeta,
	bucketIndexOf,
	buildBuckets,
	categoryKeyOf,
	changePercentage,
	convertRow,
	iso,
	MockLedger,
	moneyDto,
	OTHER_TOKEN,
	parseLedgerQuery,
	parseLimit,
	percentage,
	previousWindow,
	resolveGranularity,
	selectFlows,
} from "@feature/filters/ledger-api";

import type { CategoryRefDto, LedgerRow } from "@feature/filters/ledger-api";
import type { CategorySeriesDto, CategoryShareDto } from "../types.ts";
import type {
	CategoryBreakdownRequest,
	CategoryBreakdownResponse,
	CategoryTrendsRequest,
	CategoryTrendsResponse,
	ICategoriesRESTApiClient,
} from "./types.ts";


interface CategoryTally {
	key: string;
	category: CategoryRefDto | null;
	amount: number;
	count: number;
}

const DEFAULT_TRENDS_LIMIT = 6;
const MAX_TRENDS_LIMIT = 7;

const tallyByCategory = (rows: LedgerRow[], currency: string): Map<string, CategoryTally> => {
	const tallies = new Map<string, CategoryTally>();

	rows.forEach((row) => {
		const key = categoryKeyOf(row.category);
		const tally = tallies.get(key) ?? {
			key,
			category: row.category,
			amount: 0,
			count: 0
		};
		
		tally.amount += convertRow(row, currency);
		tally.count += 1;
		tallies.set(key, tally);
	});

	return tallies;
};

class CategoriesMockRESTApiClient implements ICategoriesRESTApiClient {
	public async getBreakdown(payload: CategoryBreakdownRequest): Promise<CategoryBreakdownResponse> {
		await delay();

		const ledger = new MockLedger();
		const query = parseLedgerQuery(payload.params, ledger);
		const side = payload.params.type ?? 'expense';
		const current = tallyByCategory(selectFlows(ledger, query, { side }), query.currency);
		const previous = tallyByCategory(selectFlows(ledger, query, { side, window: previousWindow(query) }), query.currency);
		const total = [...current.values()].reduce((sum, tally) => sum + tally.amount, 0);
		const categories: CategoryShareDto[] = [...current.values()]
			.sort((left, right) => right.amount - left.amount)
			.map((tally) => {
				const previousAmount = previous.get(tally.key)?.amount ?? 0;

				return {
					category: tally.category,
					amount: moneyDto(tally.amount, query.currency),
					share: percentage(tally.amount, total),
					transactions_count: tally.count,
					average: moneyDto(tally.amount / tally.count, query.currency),
					previous_amount: moneyDto(previousAmount, query.currency),
					change_percentage: changePercentage(tally.amount, previousAmount),
				};
			});

		return {
			data: { type: side, total: moneyDto(total, query.currency), categories },
			meta: analyticsMeta(query),
		};
	}

	public async getTrends(payload: CategoryTrendsRequest): Promise<CategoryTrendsResponse> {
		await delay();

		const ledger = new MockLedger();
		const query = parseLedgerQuery(payload.params, ledger);
		const side = payload.params.type ?? 'expense';
		const limit = parseLimit(payload.params.limit, DEFAULT_TRENDS_LIMIT, MAX_TRENDS_LIMIT);
		const granularity = resolveGranularity(payload.params.granularity, query);
		const buckets = buildBuckets(query, granularity);
		const rows = selectFlows(ledger, query, { side });
		const ranked = [...tallyByCategory(rows, query.currency).values()].sort((left, right) => right.amount - left.amount);
		const featured = query.categories === null ? ranked.slice(0, limit) : ranked;
		const featuredKeys = new Set(featured.map((tally) => tally.key));
		const hasOther = query.categories === null && ranked.length > featured.length;
		const keys: string[] = [
			...featured.map((tally) => tally.key),
			...(hasOther ? [OTHER_TOKEN] : []),
		];
		const categoryOf = new Map(featured.map((tally) => [tally.key, tally.category]));
		const grid = keys.map(() => buckets.map(() => 0));

		rows.forEach((row) => {
			const bucketIndex = bucketIndexOf(buckets, row.createdAt);
			if (bucketIndex < 0) {
				return;
			}

			const key = categoryKeyOf(row.category);
			const seriesIndex = featuredKeys.has(key) ? keys.indexOf(key) : keys.indexOf(OTHER_TOKEN);
			if (seriesIndex >= 0) {
				grid[seriesIndex][bucketIndex] += convertRow(row, query.currency);
			}
		});

		const series: CategorySeriesDto[] = keys.map((key, index) => ({
			key,
			category: categoryOf.get(key) ?? null,
			kind: key === OTHER_TOKEN ? 'other' : 'category',
			total: moneyDto(grid[index].reduce((sum, value) => sum + value, 0), query.currency),
			points: grid[index].map((value) => moneyDto(value, query.currency)),
		}));

		return {
			data: {
				type: side,
				buckets: buckets.map((bucket) => ({ start: iso(bucket.start), end: iso(bucket.end) })),
				series,
			},
			meta: { ...analyticsMeta(query), granularity },
		};
	}
}

export { CategoriesMockRESTApiClient };
