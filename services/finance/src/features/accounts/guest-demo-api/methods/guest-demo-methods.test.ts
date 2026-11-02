import { describe, expect, test, vi } from 'vitest';

import { METRICS_READINESS_PROBE } from '../config.ts';
import { isGuestDemoReadModelBehind } from './probe-guest-demo-readiness.ts';
import { startGuestDemoSession } from './start-guest-demo-session.ts';


describe('startGuestDemoSession', () => {
	test('maps the session and keeps the signed write version', async () => {
		const post = vi.fn().mockResolvedValue({
			body: { data: { token: 'token-a', expires_at: '2026-11-02T00:00:00+00:00' }, meta: {} },
			writeVersion: '42:abcdef',
		});

		await expect(startGuestDemoSession({ handler: { post } })).resolves.toEqual({
			token: 'token-a',
			expiresAt: '2026-11-02T00:00:00+00:00',
			writeVersion: '42:abcdef',
		});
	});
});

describe('isGuestDemoReadModelBehind', () => {
	test('a stale read reports the read model as behind', async () => {
		const probe = vi.fn().mockResolvedValue({ status: 507 });

		await expect(isGuestDemoReadModelBehind({
			handler: { probe },
			probe: METRICS_READINESS_PROBE,
			writeVersion: '42:abcdef',
		})).resolves.toBe(true);
	});

	test('an unreachable read model never holds the preparation', async () => {
		const probe = vi.fn().mockRejectedValue(new Error('Network Error'));

		await expect(isGuestDemoReadModelBehind({
			handler: { probe },
			probe: METRICS_READINESS_PROBE,
			writeVersion: '42:abcdef',
		})).resolves.toBe(false);
	});
});
