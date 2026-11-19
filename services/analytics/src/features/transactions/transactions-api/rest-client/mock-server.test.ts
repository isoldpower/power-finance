import { describe, expect, test } from 'vitest';

import { isApiError } from '@internal/shared';
import { TransactionsMockRESTApiClient } from './mock-server.ts';


const params = {
	since: new Date(Date.now() - 90 * 86_400_000).toISOString(),
	until: new Date().toISOString(),
	currency: 'USD',
	timezone: 'UTC',
};

describe('TransactionsMockRESTApiClient', () => {
	test('ranks counterparties by amount within the limit', async () => {
		const response = await new TransactionsMockRESTApiClient().getCounterparties({ params: { ...params, limit: 5 } });
		const amounts = response.data.map((counterparty) => Number.parseFloat(counterparty.amount.amount));

		expect(response.data).toHaveLength(5);
		expect([...amounts].sort((left, right) => right - left)).toEqual(amounts);
		expect(response.meta.total_counterparties).toBeGreaterThan(5);
	});

	test('refuses an unknown category id with category_unknown', async () => {
		const request = new TransactionsMockRESTApiClient().getTransactions({
			params: { ...params, category: ['missing'] },
		});

		await expect(request).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.details[0]?.code === 'category_unknown',
		);
	});

	test('narrows the drill-down by category and side', async () => {
		const response = await new TransactionsMockRESTApiClient().getTransactions({
			params: { ...params, type: 'expense', category: ['seed-transaction-rent'] },
		});

		expect(response.data.length).toBeGreaterThan(0);
		response.data.forEach((transaction) => { expect(transaction).toMatchObject({ type: 'expense', category: { id: 'seed-transaction-rent', name: 'Rent' } }); });
		expect(response.meta.total_inflow.amount).toBe('0.00');
	});
});
