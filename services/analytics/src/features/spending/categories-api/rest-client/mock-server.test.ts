import { describe, expect, test } from 'vitest';

import { CategoriesMockRESTApiClient } from './mock-server.ts';


const params = {
	since: new Date(Date.now() - 90 * 86_400_000).toISOString(),
	until: new Date().toISOString(),
	currency: 'USD',
	timezone: 'UTC',
};

describe('CategoriesMockRESTApiClient', () => {
	test('returns categories by amount with shares adding up to the whole', async () => {
		const response = await new CategoriesMockRESTApiClient().getBreakdown({ params });
		const amounts = response.data.categories.map((share) => Number.parseFloat(share.amount.amount));
		const shares = response.data.categories.reduce((total, share) => total + share.share, 0);

		expect([...amounts].sort((left, right) => right - left)).toEqual(amounts);
		expect(shares).toBeCloseTo(100, 0);
	});

	test('folds everything past the limit into a single other series', async () => {
		const response = await new CategoriesMockRESTApiClient().getTrends({ params: { ...params, limit: 3 } });
		const { series, buckets } = response.data;

		expect(series).toHaveLength(4);
		expect(series[3]).toMatchObject({ key: '__other__', kind: 'other', category: null });
		series.forEach((entry) => { expect(entry.points).toHaveLength(buckets.length); });
	});
});
