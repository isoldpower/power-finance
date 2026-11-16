import { describe, expect, test } from 'vitest';

import { MoneyFlowMockRESTApiClient } from './mock-server.ts';


const params = {
	since: new Date(Date.now() - 90 * 86_400_000).toISOString(),
	until: new Date().toISOString(),
	currency: 'USD',
	timezone: 'UTC',
};

describe('MoneyFlowMockRESTApiClient', () => {
	test('balances every wallet node and only links nodes that exist', async () => {
		const response = await new MoneyFlowMockRESTApiClient().getMoneyFlow({ params });
		const { nodes, links } = response.data;
		const ids = new Set(nodes.map((node) => node.id));
		const flowOf = (id: string, side: 'source' | 'target'): number => links
			.filter((link) => link[side] === id)
			.reduce((total, link) => total + Number.parseFloat(link.amount.amount), 0);

		links.forEach((link) => { expect(ids.has(link.source) && ids.has(link.target)).toBe(true); });
		nodes.filter((node) => node.kind === 'wallet').forEach((node) => {
			expect(flowOf(node.id, 'target')).toBeCloseTo(flowOf(node.id, 'source'), 0);
		});
	});
});
