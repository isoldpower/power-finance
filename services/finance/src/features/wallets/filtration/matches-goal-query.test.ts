import { describe, expect, test } from 'vitest';

import { matchesGoalQuery } from './matches-goal-query.ts';

import type { Goal } from '@entity/wallets';


const buildGoal = (overrides: Partial<Goal> = {}): Goal => ({
	id: 'g1',
	name: 'New laptop',
	url: null,
	currency: 'USD',
	finishAt: '2026-12-01T00:00:00.000Z',
	createdAt: '2026-03-01T00:00:00.000Z',
	updatedAt: null,
	deletedAt: null,
	target: { amount: '2000.00', currency: 'USD' },
	progress: { amount: '250.00', currency: 'USD' },
	...overrides,
});

describe('matchesGoalQuery', () => {
	test('accepts every goal for an empty query', () => {
		expect(matchesGoalQuery(buildGoal(), {})).toBe(true);
	});

	test('matches a name fragment case insensitively', () => {
		expect(matchesGoalQuery(buildGoal(), { name: 'LAPTOP' })).toBe(true);
		expect(matchesGoalQuery(buildGoal(), { name: 'holiday' })).toBe(false);
	});

	test('restricts by currency membership', () => {
		expect(matchesGoalQuery(buildGoal(), { currencies: ['EUR', 'USD'] })).toBe(true);
		expect(matchesGoalQuery(buildGoal(), { currencies: ['EUR'] })).toBe(false);
	});

	test('bounds target and progress as decimals', () => {
		const goal = buildGoal();

		expect(matchesGoalQuery(goal, { minTarget: 2000 })).toBe(true);
		expect(matchesGoalQuery(goal, { minTarget: 2000.01 })).toBe(false);
		expect(matchesGoalQuery(goal, { maxProgress: 250 })).toBe(true);
		expect(matchesGoalQuery(goal, { minProgress: 300 })).toBe(false);
	});

	test('excludes an open-ended goal from a finish-date window', () => {
		const goal = buildGoal({ finishAt: null });

		expect(matchesGoalQuery(goal, { finishBefore: '2027-01-01T00:00:00.000Z' })).toBe(false);
		expect(matchesGoalQuery(goal, {})).toBe(true);
	});

	test('bounds the creation window at both ends', () => {
		const goal = buildGoal();

		expect(matchesGoalQuery(goal, { createdAfter: '2026-01-01T00:00:00.000Z' })).toBe(true);
		expect(matchesGoalQuery(goal, { createdBefore: '2026-02-01T00:00:00.000Z' })).toBe(false);
	});
});
