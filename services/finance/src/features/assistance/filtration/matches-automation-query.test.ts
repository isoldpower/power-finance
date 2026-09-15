import { describe, expect, test } from 'vitest';

import { matchesAutomationQuery } from './matches-automation-query.ts';

import type { Automation } from '@entity/assistance';


const buildAutomation = (overrides: Partial<Automation> = {}): Automation => ({
	id: 'r1',
	createdAt: '2026-03-01T00:00:00.000Z',
	updatedAt: null,
	deletedAt: null,
	name: 'Tag groceries',
	icon: 'basket',
	enabled: true,
	trigger: { type: 'event', event: 'transaction.created', schedule: null, condition: null },
	effects: [{ type: 'set_category', category: 'Groceries' }],
	lastRunAt: null,
	runs: 0,
	...overrides,
});

describe('matchesAutomationQuery', () => {
	test('accepts every rule for an empty query', () => {
		expect(matchesAutomationQuery(buildAutomation(), {})).toBe(true);
	});

	test('matches a name fragment case insensitively', () => {
		expect(matchesAutomationQuery(buildAutomation(), { name: 'GROCER' })).toBe(true);
		expect(matchesAutomationQuery(buildAutomation(), { name: 'digest' })).toBe(false);
	});

	test('filters on the enabled flag, including false', () => {
		expect(matchesAutomationQuery(buildAutomation(), { enabled: true })).toBe(true);
		expect(matchesAutomationQuery(buildAutomation(), { enabled: false })).toBe(false);
		expect(matchesAutomationQuery(buildAutomation({ enabled: false }), { enabled: false })).toBe(true);
	});

	test('reaches into the trigger for type, event and schedule', () => {
		const rule = buildAutomation();

		expect(matchesAutomationQuery(rule, { triggerTypes: ['event'] })).toBe(true);
		expect(matchesAutomationQuery(rule, { triggerTypes: ['schedule'] })).toBe(false);
		expect(matchesAutomationQuery(rule, { events: ['transaction.created'] })).toBe(true);
		expect(matchesAutomationQuery(rule, { events: ['transaction.updated'] })).toBe(false);
	});

	test('never matches a rule whose trigger leaves the field null', () => {
		const scheduled = buildAutomation({
			trigger: { type: 'schedule', event: null, schedule: 'weekly', condition: null },
		});

		expect(matchesAutomationQuery(scheduled, { events: ['transaction.created'] })).toBe(false);
		expect(matchesAutomationQuery(scheduled, { schedules: ['weekly'] })).toBe(true);
	});

	test('excludes a never-run rule from a last-run window', () => {
		expect(matchesAutomationQuery(buildAutomation(), { ranAfter: '2026-01-01T00:00:00.000Z' })).toBe(false);
		expect(matchesAutomationQuery(buildAutomation({ lastRunAt: '2026-06-01T00:00:00.000Z' }), {
			ranAfter: '2026-01-01T00:00:00.000Z',
		})).toBe(true);
	});
});
