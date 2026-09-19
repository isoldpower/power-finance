import { describe, expect, test } from 'vitest';

import { blankCondition, defaultOperator, levelsBelow, resetBelow } from './condition-cascade.ts';

import type { FilterFieldOption } from '@shared/api';
import type { RuleConditionSchema } from '../schema';


const FIELDS: FilterFieldOption[] = [
	{ field: 'name', label: 'Name', operators: ['icontains', 'eq'] },
	{ field: 'amount', label: 'Amount', operators: ['gt', 'lt', 'eq'] },
];

const condition: RuleConditionSchema = { field: 'amount', operator: 'gt', value: '100' };

describe('levelsBelow', () => {
	test('names every level under the one that changed', () => {
		expect(levelsBelow('eventCategory')).toEqual(['event', 'field', 'operator', 'value']);
		expect(levelsBelow('event')).toEqual(['field', 'operator', 'value']);
		expect(levelsBelow('field')).toEqual(['operator', 'value']);
		expect(levelsBelow('operator')).toEqual(['value']);
		expect(levelsBelow('value')).toEqual([]);
	});
});

describe('defaultOperator', () => {
	test('takes the first operator the field allows', () => {
		expect(defaultOperator(FIELDS, 'name')).toBe('icontains');
		expect(defaultOperator(FIELDS, 'amount')).toBe('gt');
	});

	test('falls back to equality for a field it does not know', () => {
		expect(defaultOperator(FIELDS, 'mystery')).toBe('eq');
	});
});

describe('resetBelow', () => {
	test('wipes only the value when the matcher changes', () => {
		const next: RuleConditionSchema = { ...condition, operator: 'lt' };

		expect(resetBelow(next, 'operator', FIELDS))
			.toEqual({ field: 'amount', operator: 'lt', value: '' });
	});

	test('wipes the matcher and the value when the field changes', () => {
		const next: RuleConditionSchema = { ...condition, field: 'name' };

		expect(resetBelow(next, 'field', FIELDS))
			.toEqual({ field: 'name', operator: 'icontains', value: '' });
	});

	test('wipes the whole condition when the event changes', () => {
		expect(resetBelow(condition, 'event', FIELDS))
			.toEqual({ field: 'name', operator: 'icontains', value: '' });
	});

	test('wipes the whole condition when the event category changes', () => {
		expect(resetBelow(condition, 'eventCategory', FIELDS))
			.toEqual({ field: 'name', operator: 'icontains', value: '' });
	});

	test('changes nothing at the lowest level', () => {
		expect(resetBelow(condition, 'value', FIELDS)).toEqual(condition);
	});

	test('does not mutate the condition it was given', () => {
		resetBelow(condition, 'event', FIELDS);

		expect(condition).toEqual({ field: 'amount', operator: 'gt', value: '100' });
	});
});

describe('operator ranges', () => {
	test('a matcher from one field is not always legal on another', () => {
		expect(FIELDS.find((option) => option.field === 'name')?.operators).toContain('icontains');
		expect(FIELDS.find((option) => option.field === 'amount')?.operators).not.toContain('icontains');
	});

	test('switching to that field lands on a matcher the field allows', () => {
		const stale: RuleConditionSchema = { field: 'amount', operator: 'icontains', value: 'x' };
		const settled = resetBelow(stale, 'field', FIELDS);

		expect(FIELDS.find((option) => option.field === settled.field)?.operators)
			.toContain(settled.operator);
	});
});

describe('blankCondition', () => {
	test('starts on the first field with its first operator', () => {
		expect(blankCondition(FIELDS)).toEqual({ field: 'name', operator: 'icontains', value: '' });
	});
});
