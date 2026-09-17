import { describe, expect, test } from 'vitest';

import { ruleFormToDraft } from './rule-form-draft.ts';
import { RULE_FORM_DEFAULTS } from './rule-form-schema.ts';

import type { RuleFormSchema } from './rule-form-schema.ts';


const formWith = (conditions: RuleFormSchema['conditions']): RuleFormSchema => ({
	...RULE_FORM_DEFAULTS,
	name: 'Flag chained transactions',
	eventName: 'created',
	effectType: 'notify',
	title: 'Chained transaction seen',
	conditions,
});

const leafOf = (values: RuleFormSchema) => ruleFormToDraft(values).trigger.condition;

describe('boolean conditions', () => {
	test('"yes" asks for the chain to be set', () => {
		const leaf = leafOf(formWith([{ field: 'chain_id', operator: 'eq', value: 'yes' }]));

		expect(leaf).toEqual({ field: 'chain_id', operator: 'neq', value: null });
	});

	test('"no" asks for the chain to be absent', () => {
		const leaf = leafOf(formWith([{ field: 'chain_id', operator: 'eq', value: 'no' }]));

		expect(leaf).toEqual({ field: 'chain_id', operator: 'eq', value: null });
	});

	test('never sends the word the form collected', () => {
		const leaf = leafOf(formWith([{ field: 'chain_id', operator: 'eq', value: 'yes' }]));

		expect(JSON.stringify(leaf)).not.toContain('yes');
	});

	test('leaves ordinary fields alone', () => {
		const leaf = leafOf(formWith([{ field: 'name', operator: 'icontains', value: 'rent' }]));

		expect(leaf).toEqual({ field: 'name', operator: 'icontains', value: 'rent' });
	});
});
