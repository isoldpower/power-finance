import { describe, expect, test } from 'vitest';

import { composeEvent, splitEvent } from './event-composition.ts';


describe('composeEvent', () => {
	test('joins the category and the form name into the wire event', () => {
		expect(composeEvent('transaction', 'created')).toBe('transaction.created');
	});

	test('sends "changed" as the API\'s "updated"', () => {
		expect(composeEvent('transaction', 'changed')).toBe('transaction.updated');
	});

	test('stays empty while no event is picked', () => {
		expect(composeEvent('transaction', '')).toBe('');
	});
});

describe('splitEvent', () => {
	test('reads a wire event back into its two levels', () => {
		expect(splitEvent('transaction.created')).toEqual({ category: 'transaction', name: 'created' });
		expect(splitEvent('transaction.updated')).toEqual({ category: 'transaction', name: 'changed' });
	});

	test('falls back to an unpicked transaction event when there is none', () => {
		expect(splitEvent(null)).toEqual({ category: 'transaction', name: '' });
	});

	test('round-trips every event the form can produce', () => {
		const composed = composeEvent('transaction', 'changed');
		expect(splitEvent(composed === '' ? null : composed))
			.toEqual({ category: 'transaction', name: 'changed' });
	});
});
