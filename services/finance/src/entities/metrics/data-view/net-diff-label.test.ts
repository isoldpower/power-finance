import { describe, expect, test } from 'vitest';

import { netDiffBadgeLabel, NEW_GROWTH_LABEL, NO_CHANGE_LABEL } from './net-diff-label.ts';

import type { NetDiff } from '../types.ts';


const netDiff = (percentage: number | null, direction: NetDiff['direction']): NetDiff => ({
	percentage,
	direction,
});

describe('netDiffBadgeLabel', () => {
	test('shows the signed percentage when the API reports one', () => {
		expect(netDiffBadgeLabel(netDiff(12.5, 'up'), '+')).toBe('+12.5%');
		expect(netDiffBadgeLabel(netDiff(-8, 'down'), '−')).toBe('−8%');
	});

	test('never prefixes a sign onto a placeholder', () => {
		expect(netDiffBadgeLabel(netDiff(null, 'up'), '+')).not.toContain('+');
		expect(netDiffBadgeLabel(netDiff(null, 'up'), '+')).not.toContain('—');
	});

	test('names growth from nothing rather than an undefined rate', () => {
		expect(netDiffBadgeLabel(netDiff(null, 'up'), '+')).toBe(NEW_GROWTH_LABEL);
	});

	test('says plainly when nothing moved', () => {
		expect(netDiffBadgeLabel(netDiff(null, 'flat'), '+')).toBe(NO_CHANGE_LABEL);
	});
});
