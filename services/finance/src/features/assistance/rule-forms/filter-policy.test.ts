import { describe, expect, test } from 'vitest';

import {
	FILTER_POLICY_INPUTS,
	filterPolicySource,
	formatMultiValue,
	parseMultiValue,
	resolveFilterInput,
} from './filter-policy.ts';
import { TRANSACTION_FILTER_FIELDS } from '@feature/transactions/filtration';
import { WALLET_FILTER_FIELDS } from '@feature/wallets/filtration';


describe('filterPolicySource', () => {
	test('reads a schedule trigger as the wallet source', () => {
		expect(filterPolicySource('schedule', '')).toBe('schedule');
	});

	test('keeps the chosen event as its own source', () => {
		expect(filterPolicySource('event', 'transaction.updated')).toBe('transaction.updated');
	});

	test('falls back to a transaction source before an event is picked', () => {
		expect(filterPolicySource('event', '')).toBe('transaction.created');
	});
});

describe('resolveFilterInput', () => {
	test('maps a transaction field to its own control', () => {
		expect(resolveFilterInput('transaction.created', 'currency', 'eq').kind).toBe('currency');
		expect(resolveFilterInput('transaction.created', 'type', 'eq').kind).toBe('transactionType');
		expect(resolveFilterInput('transaction.created', 'wallet_id', 'eq').kind).toBe('wallet');
		expect(resolveFilterInput('transaction.created', 'amount', 'gt').kind).toBe('number');
		expect(resolveFilterInput('transaction.created', 'created_at', 'gte').kind).toBe('date');
	});

	test('reads the same field differently under another source', () => {
		expect(resolveFilterInput('transaction.created', 'category', 'eq').kind).toBe('category');
		expect(resolveFilterInput('schedule', 'balance', 'gt').kind).toBe('number');
	});

	test('turns any field into a multi-value control for "one of"', () => {
		expect(resolveFilterInput('transaction.created', 'currency', 'in').multiple).toBe(true);
		expect(resolveFilterInput('transaction.created', 'currency', 'eq').multiple).toBe(false);
	});

	test('falls back to free text for a field the source does not describe', () => {
		expect(resolveFilterInput('schedule', 'wallet_id', 'eq').kind).toBe('text');
	});
});

describe('policy coverage', () => {
	test('describes every transaction field the rule builder offers', () => {
		for (const option of TRANSACTION_FILTER_FIELDS) {
			expect(FILTER_POLICY_INPUTS['transaction.created']).toHaveProperty(option.field);
		}
	});

	test('describes every wallet field the rule builder offers', () => {
		for (const option of WALLET_FILTER_FIELDS) {
			expect(FILTER_POLICY_INPUTS.schedule).toHaveProperty(option.field);
		}
	});
});

describe('multi values', () => {
	test('drops blanks and padding when reading a list', () => {
		expect(parseMultiValue(' USD , , EUR ')).toEqual(['USD', 'EUR']);
	});

	test('reads back what it writes', () => {
		expect(parseMultiValue(formatMultiValue(['USD', 'EUR']))).toEqual(['USD', 'EUR']);
	});

	test('treats an empty value as no selection', () => {
		expect(parseMultiValue('')).toEqual([]);
	});
});
