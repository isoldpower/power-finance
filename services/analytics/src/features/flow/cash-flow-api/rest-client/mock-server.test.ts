import { describe, expect, test } from 'vitest';

import { CashFlowMockRESTApiClient } from './mock-server.ts';


const params = {
	since: new Date(Date.now() - 90 * 86_400_000).toISOString(),
	until: new Date().toISOString(),
	currency: 'USD',
	timezone: 'UTC',
};

const sum = (values: string[]): number => values.reduce((total, value) => total + Number.parseFloat(value), 0);

describe('CashFlowMockRESTApiClient', () => {
	test('zero-fills a continuous bucket series whose totals match the buckets', async () => {
		const response = await new CashFlowMockRESTApiClient().getCashFlow({ params: { ...params, granularity: 'week' } });
		const { buckets, totals } = response.data;

		expect(response.meta.granularity).toBe('week');
		buckets.slice(1).forEach((bucket, index) => { expect(bucket.start).toBe(buckets[index].end); });
		expect(sum(buckets.map((bucket) => bucket.inflow.amount))).toBeCloseTo(Number.parseFloat(totals.inflow.amount), 0);
		expect(sum(buckets.map((bucket) => bucket.outflow.amount))).toBeCloseTo(Number.parseFloat(totals.outflow.amount), 0);
	});

	test('chooses the granularity from the window when none is requested', async () => {
		const response = await new CashFlowMockRESTApiClient().getCashFlow({ params });

		expect(response.meta.granularity).toBe('week');
	});
});
