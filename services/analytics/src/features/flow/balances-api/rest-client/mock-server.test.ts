import { describe, expect, test } from 'vitest';

import { BalancesMockRESTApiClient } from './mock-server.ts';


const params = {
	since: new Date(Date.now() - 90 * 86_400_000).toISOString(),
	until: new Date().toISOString(),
	currency: 'USD',
	timezone: 'UTC',
};

describe('BalancesMockRESTApiClient', () => {
	test('samples the requested number of points and totals the wallets', async () => {
		const response = await new BalancesMockRESTApiClient().getBalanceHistory({ params: { ...params, points: 12 } });
		const { timestamps, total, wallets } = response.data;

		expect(timestamps).toHaveLength(12);
		total.forEach((balance, index) => {
			const sum = wallets.reduce((acc, series) => acc + Number.parseFloat(series.balances[index].amount), 0);
			expect(Number.parseFloat(balance.amount)).toBeCloseTo(sum, 1);
		});
	});
});
