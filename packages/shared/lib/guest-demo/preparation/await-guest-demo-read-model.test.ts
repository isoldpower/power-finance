import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { awaitGuestDemoReadModel } from './await-guest-demo-read-model.ts';

import type { GuestDemoSession } from '../types.ts';
import type { IGuestDemoReadinessRESTApiClient } from '../api/index.ts';


const SIGNED_WRITE_VERSION = '42:abcdef';

function guestDemoSession(writeVersion: string | null): GuestDemoSession {
	return { token: 'token-a', expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), writeVersion };
}

describe('awaitGuestDemoReadModel', () => {
	let probe: ReturnType<typeof vi.fn<IGuestDemoReadinessRESTApiClient['probe']>>;

	beforeEach(() => {
		vi.useFakeTimers();
		probe = vi.fn<IGuestDemoReadinessRESTApiClient['probe']>();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	test('waits for the postgres read model, then for the search index', async () => {
		probe
			.mockResolvedValueOnce({ status: 507 })
			.mockResolvedValueOnce({ status: 200 })
			.mockResolvedValueOnce({ status: 507 })
			.mockResolvedValueOnce({ status: 507 })
			.mockResolvedValueOnce({ status: 200 });

		const readiness = awaitGuestDemoReadModel({
			handler: { probe },
			session: guestDemoSession(SIGNED_WRITE_VERSION),
			signal: new AbortController().signal,
			onReached: vi.fn(),
		});
		await vi.runAllTimersAsync();
		await readiness;

		expect(probe.mock.calls.map(([request]) => `${request.probe.method} ${request.probe.path}`)).toEqual([
			'GET /metrics',
			'GET /metrics',
			'POST /transactions/search?limit=1',
			'POST /transactions/search?limit=1',
			'POST /transactions/search?limit=1',
		]);
		expect(probe.mock.calls.every(([request]) => request.writeVersion === SIGNED_WRITE_VERSION)).toBe(true);
	});

	test('skips polling when the session carried no write version', async () => {
		await awaitGuestDemoReadModel({
			handler: { probe },
			session: guestDemoSession(null),
			signal: new AbortController().signal,
			onReached: vi.fn(),
		});

		expect(probe).not.toHaveBeenCalled();
	});

	test('gives up once the shared readiness timeout elapses', async () => {
		probe.mockResolvedValue({ status: 507 });

		const readiness = awaitGuestDemoReadModel({
			handler: { probe },
			session: guestDemoSession(SIGNED_WRITE_VERSION),
			signal: new AbortController().signal,
			onReached: vi.fn(),
		});
		await vi.advanceTimersByTimeAsync(61 * 1000);

		await expect(readiness).resolves.toBeUndefined();
	});

	test('stops polling once aborted and reports nothing further', async () => {
		probe.mockResolvedValue({ status: 507 });
		const abortController = new AbortController();
		const onReached = vi.fn();

		const readiness = awaitGuestDemoReadModel({
			handler: { probe },
			session: guestDemoSession(SIGNED_WRITE_VERSION),
			signal: abortController.signal,
			onReached,
		});
		await vi.advanceTimersByTimeAsync(1000);
		abortController.abort();
		await vi.advanceTimersByTimeAsync(5000);
		await readiness;
		const callsAfterAbort = probe.mock.calls.length;
		await vi.advanceTimersByTimeAsync(10 * 1000);

		expect(probe.mock.calls.length).toBe(callsAfterAbort);
		expect(onReached).not.toHaveBeenCalled();
	});

	test('becomes browsable once postgres catches up, ready once search does', async () => {
		probe
			.mockResolvedValueOnce({ status: 200 })
			.mockResolvedValueOnce({ status: 507 })
			.mockResolvedValueOnce({ status: 200 });
		const onReached = vi.fn();

		const readiness = awaitGuestDemoReadModel({
			handler: { probe },
			session: guestDemoSession(SIGNED_WRITE_VERSION),
			signal: new AbortController().signal,
			onReached,
		});
		await vi.advanceTimersByTimeAsync(0);

		expect(onReached.mock.calls).toEqual([['browsable']]);

		await vi.runAllTimersAsync();
		await readiness;

		expect(onReached.mock.calls).toEqual([['browsable'], ['ready']]);
	});
});
