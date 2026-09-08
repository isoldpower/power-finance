import { describe, expect, test } from 'vitest';

import { netDiffChange, signedNetDiff } from './net-diff-amount.ts';

import type { NetDiffDirection, NetWorth } from '@entity/metrics';


const netWorth = (
	amounts: string[],
	percentage: number | null = null,
	direction: NetDiffDirection = 'up',
): NetWorth => ({
	money: { amount: amounts.at(-1) ?? '0.00', currency: 'USD' },
	netDiff: { percentage, direction },
	series: amounts.map((amount, index) => ({
		timestamp: `2026-09-0${(index + 1).toString()}T00:00:00Z`,
		money: { amount, currency: 'USD' },
	})),
});

describe('signedNetDiff', () => {
	test('reads the change from the ends of the series', () => {
		expect(signedNetDiff(netWorth(['1413.30', '1413.30', '1684.23']))).toBe('270.93');
	});

	test('reports a loss as negative', () => {
		expect(signedNetDiff(netWorth(['500.00', '320.00']))).toBe('-180.00');
	});

	test('is zero when nothing moved', () => {
		expect(signedNetDiff(netWorth(['500.00', '500.00']))).toBe('0.00');
	});

	test('has nothing to compare with a single point', () => {
		expect(signedNetDiff(netWorth(['500.00']))).toBe('0');
	});
});

describe('netDiffChange', () => {
	test('still reports the gain when the window opened at zero', () => {
		const change = netDiffChange(netWorth(['0.00', '1684.23'], null));

		expect(change.amount).toBe('1684.23');
		expect(change.sign).toBe('+');
	});

	test('does not depend on the percentage the API leaves null', () => {
		const withPercentage = netDiffChange(netWorth(['100.00', '150.00'], 50));
		const withoutPercentage = netDiffChange(netWorth(['100.00', '150.00'], null));

		expect(withoutPercentage).toEqual(withPercentage);
	});

	test('renders the amount unsigned so the sign is not doubled', () => {
		const change = netDiffChange(netWorth(['500.00', '320.00']));

		expect(change.amount).toBe('180.00');
		expect(change.sign).toBe('−');
	});
});
