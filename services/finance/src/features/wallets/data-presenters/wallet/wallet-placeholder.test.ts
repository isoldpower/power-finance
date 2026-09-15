import { describe, expect, test } from 'vitest';
import { QueryClient } from '@tanstack/react-query';

import { walletDetailsPlaceholder } from './wallet-placeholder.ts';

import type { Page } from '@shared/api';
import type { Wallet } from '@entity/wallets';


const LIST_KEY = ['wallets', 'default', 'first'];
const SEARCH_KEY = ['searchWallet', { name: 'vau' }, 'default', 'first'];

const buildWallet = (overrides: Partial<Wallet> = {}): Wallet => ({
	id: 'w1',
	name: 'Everyday',
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

const buildPage = (items: Wallet[]): Page<Wallet> => ({
	items,
	limit: 25,
	total: items.length,
	nextCursor: null,
	prevCursor: null,
});

const seededClient = (): QueryClient => {
	const client = new QueryClient();
	client.setQueryData(LIST_KEY, { page: buildPage([buildWallet()]) });
	client.setQueryData(SEARCH_KEY, { page: buildPage([buildWallet({ id: 'w9', name: 'Vault' })]) });

	return client;
};

describe('walletDetailsPlaceholder', () => {
	test('reuses the identity a list page already holds', () => {
		const placeholder = walletDetailsPlaceholder(seededClient(), 'w1');

		expect(placeholder?.wallet.name).toBe('Everyday');
		expect(placeholder?.wallet.color).toBe('#112233');
		expect(placeholder?.wallet.balance).toEqual({ amount: '120.00', currency: 'USD' });
	});

	test('finds a wallet that only a search page holds', () => {
		const placeholder = walletDetailsPlaceholder(seededClient(), 'w9');

		expect(placeholder?.wallet.name).toBe('Vault');
	});

	test('leaves the period flows unknown rather than inventing zeroes', () => {
		const placeholder = walletDetailsPlaceholder(seededClient(), 'w1');

		expect(placeholder?.wallet.period).toBeUndefined();
	});

	test('reports no recent activity so the caller can tell it apart from an empty wallet', () => {
		const placeholder = walletDetailsPlaceholder(seededClient(), 'w1');

		expect(placeholder?.recent.items).toEqual([]);
	});

	test('gives up when no cache holds the wallet', () => {
		expect(walletDetailsPlaceholder(seededClient(), 'missing')).toBeUndefined();
	});

	test('gives up on an empty cache', () => {
		expect(walletDetailsPlaceholder(new QueryClient(), 'w1')).toBeUndefined();
	});
});
