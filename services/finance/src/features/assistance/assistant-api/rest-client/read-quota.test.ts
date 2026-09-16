import { describe, expect, test } from 'vitest';

import { readQuota } from './read-quota.ts';


describe('readQuota', () => {
	test('reads the quota that rides alongside the message frame', () => {
		expect(readQuota({ event: 'message', data: {}, quota: { messages_left: 2, allowance: 10 } }))
			.toEqual({ messages_left: 2, allowance: 10 });
	});

	test('reports no quota on a frame that carries none', () => {
		expect(readQuota({ event: 'message', data: {} })).toBeNull();
	});

	test('reads a spent allowance rather than treating zero as missing', () => {
		expect(readQuota({ quota: { messages_left: 0, allowance: 10 } }))
			.toEqual({ messages_left: 0, allowance: 10 });
	});

	test('refuses a half-built or mistyped quota', () => {
		expect(readQuota({ quota: { messages_left: 2 } })).toBeNull();
		expect(readQuota({ quota: { messages_left: '2', allowance: 10 } })).toBeNull();
		expect(readQuota({ quota: null })).toBeNull();
		expect(readQuota({ quota: 'unlimited' })).toBeNull();
	});
});
