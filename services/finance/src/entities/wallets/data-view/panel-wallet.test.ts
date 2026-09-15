import { describe, expect, test } from 'vitest';

import { DEFAULT_WALLET_COLOR } from '../visual-map';
import { toPanelWallet } from './panel-wallet.ts';

import type { Wallet } from '../types.ts';


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
	color: '#FF8800',
	...overrides,
});

describe('toPanelWallet', () => {
	test('keeps a colour the API pattern accepts', () => {
		expect(toPanelWallet(buildWallet()).color).toBe('#FF8800');
	});

	test('falls back to the default when the wallet stores none', () => {
		expect(toPanelWallet(buildWallet({ color: '' })).color).toBe(DEFAULT_WALLET_COLOR);
	});

	test('falls back for a wallet stored before colours existed', () => {
		const legacy = buildWallet({ color: undefined as unknown as string });

		expect(toPanelWallet(legacy).color).toBe(DEFAULT_WALLET_COLOR);
	});

	test('falls back rather than handing the panel an unusable colour', () => {
		expect(toPanelWallet(buildWallet({ color: 'rebeccapurple' })).color).toBe(DEFAULT_WALLET_COLOR);
	});

	test('carries the fields the edit panel renders', () => {
		expect(toPanelWallet(buildWallet())).toMatchObject({
			id: 'w1',
			name: 'Everyday',
			category: 'checking',
			currency: 'USD',
			balance: { amount: '120.00', currency: 'USD' },
		});
	});
});
