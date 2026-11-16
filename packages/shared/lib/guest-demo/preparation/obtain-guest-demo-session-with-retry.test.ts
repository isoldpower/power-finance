import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { obtainGuestDemoSessionWithRetry } from './obtain-guest-demo-session-with-retry.ts';

import type { GuestDemoSession } from '../types.ts';


const SESSION: GuestDemoSession = { token: 'token-a', expiresAt: '2026-11-16T00:00:00+00:00', writeVersion: '42:abcdef' };
const RETRY_DELAYS_MS = [1000, 3000];

describe('obtainGuestDemoSessionWithRetry', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	test('a failed seed is retried until the session starts', async () => {
		const obtain = vi.fn<() => Promise<GuestDemoSession>>()
			.mockRejectedValueOnce(new Error('seed failed'))
			.mockResolvedValueOnce(SESSION);

		const session = obtainGuestDemoSessionWithRetry({
			obtain,
			signal: new AbortController().signal,
			retryDelaysMs: RETRY_DELAYS_MS,
		});
		await vi.runAllTimersAsync();

		await expect(session).resolves.toEqual(SESSION);
		expect(obtain).toHaveBeenCalledTimes(2);
	});

	test('gives up with the last error once every retry failed', async () => {
		const obtain = vi.fn<() => Promise<GuestDemoSession>>().mockRejectedValue(new Error('seed failed'));

		const session = obtainGuestDemoSessionWithRetry({
			obtain,
			signal: new AbortController().signal,
			retryDelaysMs: RETRY_DELAYS_MS,
		});
		const rejection = expect(session).rejects.toThrow('seed failed');
		await vi.runAllTimersAsync();

		await rejection;
		expect(obtain).toHaveBeenCalledTimes(3);
	});

	test('stops retrying once aborted', async () => {
		const controller = new AbortController();
		const obtain = vi.fn<() => Promise<GuestDemoSession>>().mockRejectedValue(new Error('seed failed'));

		const session = obtainGuestDemoSessionWithRetry({
			obtain,
			signal: controller.signal,
			retryDelaysMs: RETRY_DELAYS_MS,
		});
		const rejection = expect(session).rejects.toThrow('seed failed');
		controller.abort();
		await vi.runAllTimersAsync();

		await rejection;
		expect(obtain).toHaveBeenCalledTimes(1);
	});
});
