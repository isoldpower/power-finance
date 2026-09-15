import { describe, expect, test } from 'vitest';

import {
	DEFAULT_WALLET_COLOR,
	isWalletColor,
	walletGradient,
} from './wallet-gradient.ts';


describe('isWalletColor', () => {
	test('accepts the three hex lengths the API allows', () => {
		expect(isWalletColor('#abc')).toBe(true);
		expect(isWalletColor('#6366F1')).toBe(true);
		expect(isWalletColor('#6366F1CC')).toBe(true);
	});

	test('rejects a css gradient, which is what the API refused', () => {
		expect(isWalletColor('linear-gradient(135deg,#6366f1,#4f46e5)')).toBe(false);
	});

	test('rejects a bare or malformed value', () => {
		expect(isWalletColor('')).toBe(false);
		expect(isWalletColor('6366F1')).toBe(false);
		expect(isWalletColor('#12345')).toBe(false);
	});
});

describe('walletGradient', () => {
	test('builds a gradient from a stored hex', () => {
		expect(walletGradient('#6366F1')).toContain('#6366F1');
		expect(walletGradient('#6366F1')).toMatch(/^linear-gradient\(/);
	});

	test('falls back to the default when a wallet has no colour', () => {
		expect(walletGradient('')).toBe(walletGradient(DEFAULT_WALLET_COLOR));
	});

	test('never emits a nested gradient when handed one', () => {
		const gradient = walletGradient('linear-gradient(135deg,#6366f1,#4f46e5)');

		expect(gradient.match(/linear-gradient/g)).toHaveLength(1);
	});
});

describe('the value sent on create', () => {
	test('is a hex the API pattern accepts', () => {
		expect(isWalletColor(DEFAULT_WALLET_COLOR)).toBe(true);
	});
});
