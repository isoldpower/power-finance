import { describe, expect, test } from 'vitest';

import { matchesTransactionQuery } from './matches-transaction-query.ts';

import type { Transaction } from '@entity/transactions';


const buildTransaction = (overrides: Partial<Transaction> = {}): Transaction => ({
	id: 't1',
	name: 'Coffee beans',
	createdAt: '2026-03-01T00:00:00.000Z',
	updatedAt: null,
	deletedAt: null,
	money: { amount: '12.50', currency: 'USD' },
	type: 'expense',
	origin: 'manual',
	wallet: { id: 'w1', name: 'Everyday' },
	category: 'Groceries',
	chain: null,
	...overrides,
});

describe('matchesTransactionQuery', () => {
	test('accepts every transaction for an empty query', () => {
		expect(matchesTransactionQuery(buildTransaction(), {})).toBe(true);
	});

	test('restricts by wallet, currency and category membership', () => {
		const transaction = buildTransaction();

		expect(matchesTransactionQuery(transaction, { walletIds: ['w1', 'w2'] })).toBe(true);
		expect(matchesTransactionQuery(transaction, { walletIds: ['w2'] })).toBe(false);
		expect(matchesTransactionQuery(transaction, { currencies: ['USD'] })).toBe(true);
		expect(matchesTransactionQuery(transaction, { categories: ['Rent'] })).toBe(false);
	});

	test('excludes an uncategorised transaction from a category filter', () => {
		const transaction = buildTransaction({ category: null });

		expect(matchesTransactionQuery(transaction, { categories: ['Groceries'] })).toBe(false);
		expect(matchesTransactionQuery(transaction, {})).toBe(true);
	});

	test('searches the name and the category together', () => {
		const transaction = buildTransaction();

		expect(matchesTransactionQuery(transaction, { search: 'coffee' })).toBe(true);
		expect(matchesTransactionQuery(transaction, { search: 'grocer' })).toBe(true);
		expect(matchesTransactionQuery(transaction, { search: 'rent' })).toBe(false);
	});

	test('honours the case sensitive flag', () => {
		const transaction = buildTransaction();

		expect(matchesTransactionQuery(transaction, { search: 'coffee', caseSensitive: true })).toBe(false);
		expect(matchesTransactionQuery(transaction, { search: 'Coffee', caseSensitive: true })).toBe(true);
	});

	test('filters by type and by chain', () => {
		const transaction = buildTransaction({ chain: { id: 'c1', size: 2 } });

		expect(matchesTransactionQuery(transaction, { types: ['expense'] })).toBe(true);
		expect(matchesTransactionQuery(transaction, { types: ['income'] })).toBe(false);
		expect(matchesTransactionQuery(transaction, { chainId: 'c1' })).toBe(true);
		expect(matchesTransactionQuery(transaction, { chainId: 'c2' })).toBe(false);
	});

	test('compares the amount magnitude as a decimal', () => {
		const transaction = buildTransaction();

		expect(matchesTransactionQuery(transaction, { minAmount: 12.5 })).toBe(true);
		expect(matchesTransactionQuery(transaction, { minAmount: 12.51 })).toBe(false);
		expect(matchesTransactionQuery(transaction, { maxAmount: 100 })).toBe(true);
	});

	test('bounds the creation window at both ends', () => {
		const transaction = buildTransaction();

		expect(matchesTransactionQuery(transaction, { createdAfter: '2026-01-01T00:00:00.000Z' })).toBe(true);
		expect(matchesTransactionQuery(transaction, { createdBefore: '2026-02-01T00:00:00.000Z' })).toBe(false);
	});
});
