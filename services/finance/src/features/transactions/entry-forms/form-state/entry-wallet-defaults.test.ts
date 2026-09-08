import { describe, expect, test } from 'vitest';

import { walletDefaultsFor } from './use-entry-wallet-defaults.ts';

import type { Wallet } from '@entity/wallets';


const wallet = (id: string, currency: string): Wallet => ({
	id,
	name: id,
	createdAt: '2026-01-01T00:00:00Z',
	updatedAt: null,
	deletedAt: null,
	category: 'Cash',
	currency,
	balance: { amount: '0.00', currency },
	zeroBalance: { amount: '0.00', currency },
	favorite: false,
	color: '',
});

const WALLETS = [wallet('w1', 'USD'), wallet('w2', 'EUR'), wallet('w3', 'GBP')];

describe('walletDefaultsFor', () => {
	test('puts the wallet you opened in the field an expense acts on', () => {
		expect(walletDefaultsFor('expense', WALLETS, 'w3').fromWallet).toBe('w3');
	});

	test('puts the wallet you opened in the field an income acts on', () => {
		expect(walletDefaultsFor('income', WALLETS, 'w3').toWallet).toBe('w3');
	});

	test('keeps the opened wallet as the transfer source', () => {
		const { fromWallet, toWallet } = walletDefaultsFor('transfer', WALLETS, 'w3');

		expect(fromWallet).toBe('w3');
		expect(toWallet).not.toBe('w3');
	});

	test('never pairs a wallet with itself', () => {
		const { fromWallet, toWallet } = walletDefaultsFor('transfer', WALLETS, 'w1');

		expect(fromWallet).not.toBe(toWallet);
	});

	test('falls back to the first wallet when none was opened', () => {
		expect(walletDefaultsFor('expense', WALLETS).fromWallet).toBe('w1');
		expect(walletDefaultsFor('income', WALLETS).toWallet).toBe('w1');
	});

	test('ignores a wallet id that is not in the list', () => {
		expect(walletDefaultsFor('income', WALLETS, 'gone').toWallet).toBe('w1');
	});

	test('copes with a single wallet by leaving the counterpart empty', () => {
		const { fromWallet, toWallet } = walletDefaultsFor('transfer', [WALLETS[0]], 'w1');

		expect(fromWallet).toBe('w1');
		expect(toWallet).toBe('');
	});

	test('returns nothing to select when there are no wallets', () => {
		expect(walletDefaultsFor('income', [], 'w1')).toEqual({ fromWallet: '', toWallet: '' });
	});
});
