import { describe, expect, test } from 'vitest';

import { resolveActiveTab } from './resolve-active.ts';


describe('resolveActiveTab', () => {
	test('selects the tab the path belongs to', () => {
		expect(resolveActiveTab('/dashboard')).toBe('dashboard');
		expect(resolveActiveTab('/management')).toBe('management');
		expect(resolveActiveTab('/planning')).toBe('planning');
	});

	test('keeps the parent tab selected on its nested routes', () => {
		expect(resolveActiveTab('/dashboard/wallets')).toBe('dashboard');
		expect(resolveActiveTab('/dashboard/transactions')).toBe('dashboard');
	});

	test('selects the tab when the app is mounted under the shell prefix', () => {
		expect(resolveActiveTab('/finance/dashboard')).toBe('dashboard');
		expect(resolveActiveTab('/finance/management')).toBe('management');
	});

	test('selects nothing on a route that is not a tab', () => {
		expect(resolveActiveTab('/settings')).toBeNull();
		expect(resolveActiveTab('/finance/settings')).toBeNull();
	});

	test('selects nothing at the root', () => {
		expect(resolveActiveTab('/')).toBeNull();
		expect(resolveActiveTab('')).toBeNull();
	});

	test('matches whole segments, not substrings', () => {
		expect(resolveActiveTab('/dashboards-archive')).toBeNull();
		expect(resolveActiveTab('/my-planning-notes')).toBeNull();
	});
});
