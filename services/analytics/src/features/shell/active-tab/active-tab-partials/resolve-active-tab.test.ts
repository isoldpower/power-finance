import { describe, expect, test } from 'vitest';

import { resolveActiveTab } from './resolve-active-tab.ts';


describe('resolveActiveTab', () => {
	test('selects the tab the standalone path belongs to', () => {
		expect(resolveActiveTab('/overview')).toBe('overview');
		expect(resolveActiveTab('/spending')).toBe('spending');
		expect(resolveActiveTab('/flow')).toBe('flow');
	});

	test('selects the tab under the shell prefix', () => {
		expect(resolveActiveTab('/analytics/spending')).toBe('spending');
	});

	test('matches whole segments only', () => {
		expect(resolveActiveTab('/overviews')).toBeNull();
		expect(resolveActiveTab('/')).toBeNull();
	});
});
