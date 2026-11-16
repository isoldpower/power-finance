import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { createGuestDemoSessionStore } from './session-store.ts';

import type { GuestDemoSessionPostResponse, IGuestDemoSessionsRESTApiClient } from '../api/index.ts';


const DEMO_SESSION = 'portfolio-visit-0001';
const HOUR_MS = 60 * 60 * 1000;

function sessionResponse(token: string, expiresInMs: number): GuestDemoSessionPostResponse {
	return {
		body: { data: { token, expires_at: new Date(Date.now() + expiresInMs).toISOString() }, meta: {} },
		writeVersion: '42:abcdef',
	};
}

describe('createGuestDemoSessionStore', () => {
	let post: ReturnType<typeof vi.fn<IGuestDemoSessionsRESTApiClient['post']>>;
	let client: IGuestDemoSessionsRESTApiClient;

	beforeEach(() => {
		post = vi.fn<IGuestDemoSessionsRESTApiClient['post']>();
		client = { post };
	});

	afterEach(() => {
		window.sessionStorage.clear();
	});

	test('starts one demo session and keeps its write version', async () => {
		post.mockResolvedValueOnce(sessionResponse('token-a', 24 * HOUR_MS));
		const store = createGuestDemoSessionStore({ demoSession: DEMO_SESSION, client });

		const session = await store.getState().obtainSession();

		expect(session.token).toBe('token-a');
		expect(session.writeVersion).toBe('42:abcdef');
		expect(post).toHaveBeenCalledTimes(1);
	});

	test('parallel callers share a single session request', async () => {
		post.mockResolvedValueOnce(sessionResponse('token-a', 24 * HOUR_MS));
		const store = createGuestDemoSessionStore({ demoSession: DEMO_SESSION, client });

		const sessions = await Promise.all([
			store.getState().obtainSession(),
			store.getState().obtainSession(),
			store.getState().obtainSession(),
		]);

		expect(sessions.map((session) => session.token)).toEqual(['token-a', 'token-a', 'token-a']);
		expect(post).toHaveBeenCalledTimes(1);
	});

	test('reuses the session while it is far from expiring', async () => {
		post.mockResolvedValueOnce(sessionResponse('token-a', 24 * HOUR_MS));
		const store = createGuestDemoSessionStore({ demoSession: DEMO_SESSION, client });

		await store.getState().obtainSession();
		const reused = await store.getState().obtainSession();

		expect(reused.token).toBe('token-a');
		expect(post).toHaveBeenCalledTimes(1);
	});

	test('starts a new session when the current one is about to expire', async () => {
		post
			.mockResolvedValueOnce(sessionResponse('token-a', 60 * 1000))
			.mockResolvedValueOnce(sessionResponse('token-b', 24 * HOUR_MS));
		const store = createGuestDemoSessionStore({ demoSession: DEMO_SESSION, client });

		await store.getState().obtainSession();
		const renewed = await store.getState().obtainSession();

		expect(renewed.token).toBe('token-b');
		expect(post).toHaveBeenCalledTimes(2);
	});

	test('a failed session request rejects and the next call tries again', async () => {
		post
			.mockRejectedValueOnce(new Error('HTTP 429'))
			.mockResolvedValueOnce(sessionResponse('token-b', 24 * HOUR_MS));
		const store = createGuestDemoSessionStore({ demoSession: DEMO_SESSION, client });

		await expect(store.getState().obtainSession()).rejects.toThrow('HTTP 429');
		await expect(store.getState().obtainSession()).resolves.toMatchObject({ token: 'token-b' });
	});

	test('a usable session kept in this tab skips the preparation', async () => {
		post.mockResolvedValueOnce(sessionResponse('token-a', 24 * HOUR_MS));
		await createGuestDemoSessionStore({ demoSession: DEMO_SESSION, client }).getState().obtainSession();

		const reloaded = createGuestDemoSessionStore({ demoSession: DEMO_SESSION, client });

		expect(reloaded.getState().status).toBe('ready');
		expect(reloaded.getState().session?.token).toBe('token-a');
	});

	test('a fresh visit starts out preparing', () => {
		const store = createGuestDemoSessionStore({ demoSession: DEMO_SESSION, client });

		expect(store.getState().status).toBe('preparing');
	});

	test('a visit without a demo session never prepares', () => {
		const store = createGuestDemoSessionStore({ demoSession: null, client });

		expect(store.getState().status).toBe('ready');
	});

	test('preparation only moves forward', () => {
		const store = createGuestDemoSessionStore({ demoSession: DEMO_SESSION, client });

		store.getState().advancePreparation('ready');
		store.getState().advancePreparation('browsable');

		expect(store.getState().status).toBe('ready');
	});

	test('entering early is remembered without skipping the remaining preparation', () => {
		const store = createGuestDemoSessionStore({ demoSession: DEMO_SESSION, client });

		store.getState().advancePreparation('browsable');
		store.getState().enterEarly();

		expect(store.getState()).toMatchObject({ status: 'browsable', enteredEarly: true });
	});
});
