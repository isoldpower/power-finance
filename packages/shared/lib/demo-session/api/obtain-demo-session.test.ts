import { afterEach, describe, expect, test, vi } from 'vitest';

import { forgetStoredDemoSession, storeDemoSession } from '../demo-session-storage.ts';
import { obtainDemoSession } from './obtain-demo-session.ts';

import type { IDemoSessionsRESTApiClient } from './types.ts';


const HOUR_MS = 60 * 60 * 1000;

const clientIssuing = (id: string): IDemoSessionsRESTApiClient => ({
	issue: vi.fn(() => Promise.resolve({
		data: { id, expires_at: new Date(Date.now() + HOUR_MS).toISOString() },
		meta: {},
	})),
});

describe('obtainDemoSession', () => {
	afterEach(() => {
		forgetStoredDemoSession();
	});

	test('issues once for concurrent callers and stores the id', async () => {
		const client = clientIssuing('ds_first_visit_identifier');

		const [first, second] = await Promise.all([obtainDemoSession(client), obtainDemoSession(client)]);

		expect(first.id).toBe('ds_first_visit_identifier');
		expect(second.id).toBe('ds_first_visit_identifier');
		expect(client.issue).toHaveBeenCalledTimes(1);
	});

	test('reuses a stored id that is still valid', async () => {
		storeDemoSession({ id: 'ds_stored_visit_identifier', expiresAt: new Date(Date.now() + HOUR_MS).toISOString() });
		const client = clientIssuing('ds_unused_visit_identifier');

		const session = await obtainDemoSession(client);

		expect(session.id).toBe('ds_stored_visit_identifier');
		expect(client.issue).not.toHaveBeenCalled();
	});

	test('re-issues when the stored id is about to expire', async () => {
		storeDemoSession({ id: 'ds_expiring_visit_identifier', expiresAt: new Date(Date.now() + 1000).toISOString() });
		const client = clientIssuing('ds_renewed_visit_identifier');

		const session = await obtainDemoSession(client);

		expect(session.id).toBe('ds_renewed_visit_identifier');
	});
});
