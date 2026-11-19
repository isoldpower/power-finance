import { describe, expect, test } from 'vitest';

import { drillScope } from './drill-scope.ts';

import type { AnalyticsQuery } from "@entity/filters";


const BASE: AnalyticsQuery = {
	range: { since: '2026-08-01T00:00:00.000Z', until: '2026-11-01T00:00:00.000Z' },
	currency: 'USD',
	timezone: 'UTC',
	walletIds: [],
};

describe('drillScope', () => {
	test('a category drill keeps the window and narrows by side and category', () => {
		const scope = drillScope({ kind: 'category', side: 'expense', category: null }, BASE);

		expect(scope.query).toBe(BASE);
		expect(scope.filter).toEqual({ side: 'expense', categoryIds: [null] });
	});

	test('a bucket drill replaces the window', () => {
		const range = { since: '2026-09-01T00:00:00.000Z', until: '2026-09-08T00:00:00.000Z' };
		const scope = drillScope({ kind: 'bucket', range, granularity: 'week' }, BASE);

		expect(scope.query.range).toEqual(range);
		expect(scope.filter).toEqual({});
	});

	test('a wallet drill restricts the query to that wallet', () => {
		const wallet = { id: 'w_1', name: 'Everyday', color: '#000', currency: 'USD' };

		expect(drillScope({ kind: 'wallet', wallet }, BASE).query.walletIds).toEqual(['w_1']);
	});

	test('a counterparty drill filters by name', () => {
		expect(drillScope({ kind: 'counterparty', side: 'income', name: 'Atlas' }, BASE).filter)
			.toEqual({ side: 'income', name: 'Atlas' });
	});
});
