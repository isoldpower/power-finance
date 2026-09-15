import { describe, expect, test } from 'vitest';

import { DEFAULT_WALLET_COLOR } from '@entity/wallets';
import { buildWalletDraft, buildWalletPatch, walletFieldsShape } from './wallet-fields.ts';

import type { WalletFormSchema } from './wallet-form-schema.ts';


const buildValues = (overrides: Partial<WalletFormSchema> = {}): WalletFormSchema => ({
	name: '  Travel Card  ',
	category: '  Savings  ',
	currency: 'USD',
	balance: '120.00',
	color: '#10B981',
	...overrides,
});

describe('the colour field', () => {
	test('accepts the default the panels open on', () => {
		expect(walletFieldsShape.color.safeParse(DEFAULT_WALLET_COLOR).success).toBe(true);
	});

	test('accepts a shorthand hex', () => {
		expect(walletFieldsShape.color.safeParse('#0f0').success).toBe(true);
	});

	test('rejects a named colour the API would refuse', () => {
		expect(walletFieldsShape.color.safeParse('rebeccapurple').success).toBe(false);
	});

	test('rejects an empty colour', () => {
		expect(walletFieldsShape.color.safeParse('').success).toBe(false);
	});
});

describe('buildWalletDraft', () => {
	test('sends the picked colour rather than a hardcoded default', () => {
		expect(buildWalletDraft(buildValues(), '120.00').color).toBe('#10B981');
	});

	test('trims the text the user typed', () => {
		const draft = buildWalletDraft(buildValues(), '120.00');

		expect(draft.name).toBe('Travel Card');
		expect(draft.category).toBe('Savings');
	});
});

describe('buildWalletPatch', () => {
	test('carries the colour so an edit can recolour a wallet', () => {
		expect(buildWalletPatch(buildValues({ color: '#EC4899' })).color).toBe('#EC4899');
	});

	test('trims the text the user typed', () => {
		const patch = buildWalletPatch(buildValues());

		expect(patch.name).toBe('Travel Card');
		expect(patch.category).toBe('Savings');
	});
});
