import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import { fetchCurrencies } from './fetchCurrencies.ts';
import { CURRENCY_API_URL } from "./config.ts";
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';


describe('fetchCurrencies (real calls)', () => {
	test('Returns correct structure on success', async () => {
		const result = await fetchCurrencies('USD');
		result.map((item) => {
			expect(item).toHaveProperty('to')
			expect(item).toHaveProperty('from')
			expect(item).toHaveProperty('rate')
		})
	});

	test('Has more than 100 currencies', async () => {
		const result = await fetchCurrencies('USD');
		expect(result.length).toBeGreaterThan(100);
	});

	test('Includes the source currency', async () => {
		const result = await fetchCurrencies('USD');
		expect(result.map((item) => item.from)).toContain('USD');
	});

	test('All items have the same source currency', async () => {
		const result = await fetchCurrencies('USD');
		expect(result.every((item) => item.from === 'USD')).toBe(true);
	});

	test('Throws verbose error on failure', async () => {
		await expect(fetchCurrencies('INVALID'))
			.rejects.toThrowError('Failed to fetch currencies');
	});
})

describe('fetchCurrencies (timeout)', () => {
	const server = setupServer(
		http.get(CURRENCY_API_URL, async () => {
			await new Promise((resolve) => setTimeout(resolve, 5000));

			return HttpResponse.json(
				{ success: true, info: { rate: 1.0 } },
				{ status: 200 }
			);
		})
	);

	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test('Throws timeout error after 3 seconds', async () => {
		await expect(fetchCurrencies('USD')).rejects
			.toThrowError('timeout');
	})

	test('Request time is more than 3 seconds', async () => {
		const startTime = Date.now();
		await expect(fetchCurrencies('USD')).rejects
			.toThrowError('timeout');
		const endTime = Date.now();

		expect(endTime - startTime).toBeGreaterThan(3000);
	});

	test('Request time is less than 4 seconds', async () => {
		const startTime = Date.now();
		await expect(fetchCurrencies('USD')).rejects
			.toThrowError('timeout');
		const endTime = Date.now();

		expect(endTime - startTime).toBeLessThan(4000);
	});
});
