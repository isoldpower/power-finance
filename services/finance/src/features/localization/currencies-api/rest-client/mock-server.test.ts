import { describe, test, expect } from 'vitest';

import { isApiError } from '@shared/api';
import { CurrenciesMockRESTApiClient } from './mock-server.ts';

const client = new CurrenciesMockRESTApiClient();

describe('CurrenciesMockRESTApiClient', () => {
	test('serves a catalog entry per currency', async () => {
		const { data } = await client.list({});

		expect(data.length).toBeGreaterThan(0);
		data.forEach((currency) => {
			expect(currency.code).toMatch(/^[A-Z]{3}$/);
			expect(currency.symbol).not.toBe('');
			expect(currency.name).not.toBe('');
			expect(currency.decimals).toBeGreaterThanOrEqual(0);
		});
	});

	test('reports the catalog as unpaginated', async () => {
		const { meta, data } = await client.list({});

		expect(meta.limit).toBeNull();
		expect(meta.next_cursor).toBeNull();
		expect(meta.total).toBe(data.length);
	});

	test('lists each currency once', async () => {
		const { data } = await client.list({});
		const codes = data.map((currency) => currency.code);

		expect(new Set(codes).size).toBe(codes.length);
	});

	test('keeps symbols short enough for the picker column', async () => {
		const { data } = await client.list({});

		data.forEach((currency) => {
			expect(currency.symbol.length).toBeLessThanOrEqual(2);
		});
	});

	test('quotes every catalog currency in the rate table', async () => {
		const { data: currencies } = await client.list({});
		const { data } = await client.rates({ code: 'USD' });

		currencies.forEach((currency) => {
			expect(Number.parseFloat(data.rates[currency.code])).toBeGreaterThan(0);
		});
	});

	test('quotes the base currency at 1', async () => {
		const { data } = await client.rates({ code: 'EUR' });

		expect(data.base).toBe('EUR');
		expect(data.rates.EUR).toBe('1');
	});

	test('narrows the table to the requested targets', async () => {
		const { data, meta } = await client.rates({ code: 'USD', params: { target: ['EUR', 'JPY'] } });

		expect(Object.keys(data.rates).sort()).toEqual(['EUR', 'JPY']);
		expect(meta.target).toEqual(['EUR', 'JPY']);
	});

	test('rebases rates consistently across bases', async () => {
		const usd = await client.rates({ code: 'USD' });
		const eur = await client.rates({ code: 'EUR' });
		const rebased = Number.parseFloat(usd.data.rates.JPY) / Number.parseFloat(usd.data.rates.EUR);

		expect(Number.parseFloat(eur.data.rates.JPY)).toBeCloseTo(rebased, 6);
	});

	test('rejects an unknown base with unsupported_currency', async () => {
		await expect(client.rates({ code: 'ZZZ' })).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.code === 'unsupported_currency',
		);
	});

	test('converts at the target currency scale', async () => {
		const { data } = await client.convert({ params: { from_code: 'USD', to_code: 'JPY', amount: '10.00' } });

		expect(data.from.amount).toBe('10.00');
		expect(data.to.currency).toBe('JPY');
		expect(data.to.amount).toMatch(/^\d+$/);
	});

	test('rejects an amount finer than the source currency scale', async () => {
		await expect(
			client.convert({ params: { from_code: 'USD', to_code: 'EUR', amount: '10.005' } }),
		).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.details[0]?.code === 'amount_precision',
		);
	});
});
