import { describe, expect, test } from 'vitest';

import { quotaNote } from './quota-note.ts';


describe('quotaNote', () => {
	test('leaves a healthy allowance unflagged', () => {
		expect(quotaNote({ messagesLeft: 8, allowance: 10 }))
			.toEqual({ messagesLeft: 8, allowance: 10, low: false, exhausted: false });
	});

	test('flags the last fifth of the allowance as low', () => {
		expect(quotaNote({ messagesLeft: 2, allowance: 10 }).low).toBe(true);
		expect(quotaNote({ messagesLeft: 3, allowance: 10 }).low).toBe(false);
	});

	test('scales the low mark with the allowance', () => {
		expect(quotaNote({ messagesLeft: 20, allowance: 100 }).low).toBe(true);
		expect(quotaNote({ messagesLeft: 21, allowance: 100 }).low).toBe(false);
	});

	test('still warns on the final message of a tiny allowance', () => {
		expect(quotaNote({ messagesLeft: 1, allowance: 3 }).low).toBe(true);
	});

	test('counts a spent allowance as exhausted, never as low', () => {
		expect(quotaNote({ messagesLeft: 0, allowance: 10 }))
			.toEqual({ messagesLeft: 0, allowance: 10, low: false, exhausted: true });
	});

	test('clamps a negative balance the server should never send', () => {
		expect(quotaNote({ messagesLeft: -3, allowance: 10 }))
			.toEqual({ messagesLeft: 0, allowance: 10, low: false, exhausted: true });
	});
});
