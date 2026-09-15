import { describe, expect, test } from 'vitest';

import { matchesWalletQuery } from './matches-wallet-query.ts';

import type { Wallet } from '@entity/wallets';


const buildWallet = (overrides: Partial<Wallet> = {}): Wallet => ({
	id: 'w1',
	name: 'Everyday spending',
	createdAt: '2026-03-01T00:00:00.000Z',
	updatedAt: null,
	deletedAt: null,
	category: 'checking',
	currency: 'USD',
	balance: { amount: '120.00', currency: 'USD' },
	zeroBalance: { amount: '0.00', currency: 'USD' },
	favorite: false,
	color: '#112233',
	...overrides,
});

describe('matchesWalletQuery', () => {
	test('accepts every wallet for an empty query', () => {
		expect(matchesWalletQuery(buildWallet(), {})).toBe(true);
	});

	test('matches a name fragment case insensitively', () => {
		expect(matchesWalletQuery(buildWallet(), { name: 'DAY SP' })).toBe(true);
		expect(matchesWalletQuery(buildWallet(), { name: 'savings' })).toBe(false);
	});

	test('treats an empty name as no filter at all', () => {
		expect(matchesWalletQuery(buildWallet(), { name: '' })).toBe(true);
	});

	test('restricts by currency membership', () => {
		expect(matchesWalletQuery(buildWallet(), { currencies: ['EUR', 'USD'] })).toBe(true);
		expect(matchesWalletQuery(buildWallet(), { currencies: ['EUR'] })).toBe(false);
	});

	test('compares balances as decimals, not as strings', () => {
		const wallet = buildWallet({ balance: { amount: '9.50', currency: 'USD' } });

		expect(matchesWalletQuery(wallet, { minBalance: 9.5 })).toBe(true);
		expect(matchesWalletQuery(wallet, { minBalance: 10 })).toBe(false);
		expect(matchesWalletQuery(wallet, { maxBalance: 100 })).toBe(true);
	});

	test('bounds the creation window at both ends', () => {
		const wallet = buildWallet();

		expect(matchesWalletQuery(wallet, { createdAfter: '2026-01-01T00:00:00.000Z' })).toBe(true);
		expect(matchesWalletQuery(wallet, { createdBefore: '2026-02-01T00:00:00.000Z' })).toBe(false);
	});
});
