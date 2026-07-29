import { describe, test, expect } from 'vitest';

import { FxMockRESTApiClient } from './mock-server.ts';

const client = new FxMockRESTApiClient();

describe('FxMockRESTApiClient', () => {
	test('serves a catalog entry per currency', async () => {
		const { currencies } = await client.getCurrencies();

		expect(currencies.length).toBeGreaterThan(0);
		currencies.forEach((currency) => {
			expect(currency.code).toMatch(/^[A-Z]{3}$/);
			expect(currency.symbol).not.toBe('');
			expect(currency.name).not.toBe('');
			expect(currency.decimals).toBeGreaterThanOrEqual(0);
		});
	});

	test('lists each currency once', async () => {
		const { currencies } = await client.getCurrencies();
		const codes = currencies.map((currency) => currency.code);

		expect(new Set(codes).size).toBe(codes.length);
	});

	// The picker renders the symbol in a fixed 24px column; longer symbols get ellipsised.
	test('keeps symbols short enough for the picker column', async () => {
		const { currencies } = await client.getCurrencies();

		currencies.forEach((currency) => {
			expect(currency.symbol.length).toBeLessThanOrEqual(2);
		});
	});

	test('quotes every catalog currency in the rate table', async () => {
		const { currencies } = await client.getCurrencies();
		const { rates } = await client.getRates({ params: { base: 'USD' } });

		currencies.forEach((currency) => {
			expect(rates[currency.code]).toBeGreaterThan(0);
		});
	});

	test('quotes the base currency at 1', async () => {
		const { base, rates } = await client.getRates({ params: { base: 'EUR' } });

		expect(base).toBe('EUR');
		expect(rates.EUR).toBe(1);
	});

	test('rebases rates consistently across bases', async () => {
		const usd = await client.getRates({ params: { base: 'USD' } });
		const eur = await client.getRates({ params: { base: 'EUR' } });

		expect(eur.rates.JPY).toBeCloseTo(usd.rates.JPY / usd.rates.EUR, 6);
	});

	test('falls back to an unrebased table for an unknown base', async () => {
		const { rates } = await client.getRates({ params: { base: 'ZZZ' } });

		expect(rates.USD).toBe(1);
	});
});
