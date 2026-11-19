import { describe, expect, test } from 'vitest';

import { OverviewMockRESTApiClient } from './mock-server.ts';


const params = {
	since: new Date(Date.now() - 90 * 86_400_000).toISOString(),
	until: new Date().toISOString(),
	currency: 'USD',
	timezone: 'UTC',
};

describe('OverviewMockRESTApiClient', () => {
	test('reports the window and the equally long window before it', async () => {
		const response = await new OverviewMockRESTApiClient().getOverview({ params });
		const { current, previous } = response.data;

		expect(previous.until).toBe(current.since);
		expect(Number.parseFloat(current.net.amount)).toBeCloseTo(
			Number.parseFloat(current.inflow.amount) - Number.parseFloat(current.outflow.amount),
			1,
		);
	});
});
