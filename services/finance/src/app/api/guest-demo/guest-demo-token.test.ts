import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { forgetGuestDemoToken, obtainGuestDemoToken } from './guest-demo-token.ts';


const SESSIONS_URL = 'https://manage-api.example.test/api/v1/demo/sessions';
const DEMO_SESSION = 'portfolio-visit-0001';
const HOUR_MS = 60 * 60 * 1000;

function sessionResponse(token: string, expiresInMs: number): Response {
	return new Response(
		JSON.stringify({ data: { token, expires_at: new Date(Date.now() + expiresInMs).toISOString() }, meta: {} }),
		{ status: 201, headers: { 'Content-Type': 'application/json' } }
	);
}

describe('obtainGuestDemoToken', () => {
	let fetchMock: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		fetchMock = vi.fn();
		vi.stubGlobal('fetch', fetchMock);
	});

	afterEach(() => {
		forgetGuestDemoToken();
		vi.unstubAllGlobals();
	});

	test('starts one demo session and tags it with the demo session id', async () => {
		fetchMock.mockResolvedValueOnce(sessionResponse('token-a', 24 * HOUR_MS));

		const token = await obtainGuestDemoToken(SESSIONS_URL, DEMO_SESSION);

		expect(token).toBe('token-a');
		expect(fetchMock).toHaveBeenCalledTimes(1);
		const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
		expect(url).toBe(SESSIONS_URL);
		expect(init.method).toBe('POST');
		expect((init.headers as Record<string, string>)['X-Demo-Session']).toBe(DEMO_SESSION);
	});

	test('parallel callers share a single session request', async () => {
		fetchMock.mockResolvedValueOnce(sessionResponse('token-a', 24 * HOUR_MS));

		const tokens = await Promise.all([
			obtainGuestDemoToken(SESSIONS_URL, DEMO_SESSION),
			obtainGuestDemoToken(SESSIONS_URL, DEMO_SESSION),
			obtainGuestDemoToken(SESSIONS_URL, DEMO_SESSION),
		]);

		expect(tokens).toEqual(['token-a', 'token-a', 'token-a']);
		expect(fetchMock).toHaveBeenCalledTimes(1);
	});

	test('reuses a stored token while it is far from expiring', async () => {
		fetchMock.mockResolvedValueOnce(sessionResponse('token-a', 24 * HOUR_MS));

		await obtainGuestDemoToken(SESSIONS_URL, DEMO_SESSION);
		const reusedToken = await obtainGuestDemoToken(SESSIONS_URL, DEMO_SESSION);

		expect(reusedToken).toBe('token-a');
		expect(fetchMock).toHaveBeenCalledTimes(1);
	});

	test('starts a new session when the stored token is about to expire', async () => {
		fetchMock
			.mockResolvedValueOnce(sessionResponse('token-a', 60 * 1000))
			.mockResolvedValueOnce(sessionResponse('token-b', 24 * HOUR_MS));

		await obtainGuestDemoToken(SESSIONS_URL, DEMO_SESSION);
		const renewedToken = await obtainGuestDemoToken(SESSIONS_URL, DEMO_SESSION);

		expect(renewedToken).toBe('token-b');
		expect(fetchMock).toHaveBeenCalledTimes(2);
	});

	test('a failed session request rejects and the next call tries again', async () => {
		fetchMock
			.mockResolvedValueOnce(new Response('{}', { status: 429 }))
			.mockResolvedValueOnce(sessionResponse('token-b', 24 * HOUR_MS));

		await expect(obtainGuestDemoToken(SESSIONS_URL, DEMO_SESSION)).rejects.toThrow('HTTP 429');
		await expect(obtainGuestDemoToken(SESSIONS_URL, DEMO_SESSION)).resolves.toBe('token-b');
	});
});
