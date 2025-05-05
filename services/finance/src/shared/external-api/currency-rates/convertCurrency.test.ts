import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import { convertCurrency } from './convertCurrency.ts';
import { CONVERT_CURRENCY_API_URL } from "./config.ts";
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';


describe('convertCurrency (real calls)', () => {
	test('Returns correct structure on success', async () => {
		const result = await convertCurrency('USD', 'EUR');
		expect(result).toHaveProperty('from');
		expect(result).toHaveProperty('to');
		expect(result).toHaveProperty('rate');
	});

	test('Returns correct value on same currency', async () => {
		const result = await convertCurrency('USD', 'USD');
		expect(result.from).toBe('USD');
		expect(result.to).toBe('USD');
		expect(result.rate).toBe(1);
	});

	test('Throws verbose error on failure', async () => {
		await expect(convertCurrency('INVALID', 'INVALID'))
			.rejects.toThrowError('Failed to fetch currencies');
	});
})


describe('convertCurrency (timeout)', () => {
	const server = setupServer(
		http.get(CONVERT_CURRENCY_API_URL, async () => {
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
		await expect(convertCurrency('USD', 'EUR')).rejects
			.toThrowError('timeout');
	})

	test('Request time is more than 3 seconds', async () => {
		const startTime = Date.now();
		await expect(convertCurrency('USD', 'EUR')).rejects
			.toThrowError('timeout');
		const endTime = Date.now();

		expect(endTime - startTime).toBeGreaterThan(3000);
	});

	test('Request time is less than 4 seconds', async () => {
		const startTime = Date.now();
		await expect(convertCurrency('USD', 'EUR')).rejects
			.toThrowError('timeout');
		const endTime = Date.now();

		expect(endTime - startTime).toBeLessThan(4000);
	});
});
