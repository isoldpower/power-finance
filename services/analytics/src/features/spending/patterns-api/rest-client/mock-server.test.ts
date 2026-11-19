import { describe, expect, test } from 'vitest';

import { PatternsMockRESTApiClient } from './mock-server.ts';


const params = {
	since: new Date(Date.now() - 90 * 86_400_000).toISOString(),
	until: new Date().toISOString(),
	currency: 'USD',
	timezone: 'UTC',
};

describe('PatternsMockRESTApiClient', () => {
	test('returns one calendar entry per day of the window', async () => {
		const response = await new PatternsMockRESTApiClient().getCalendar({ params });

		expect(response.data.days.length).toBeGreaterThanOrEqual(90);
		expect(new Set(response.data.days.map((day) => day.date)).size).toBe(response.data.days.length);
	});

	test('returns the full weekday by hour matrix', async () => {
		const response = await new PatternsMockRESTApiClient().getRhythm({ params });

		expect(response.data.cells).toHaveLength(168);
		expect(response.data.peak).not.toBeNull();
	});
});
