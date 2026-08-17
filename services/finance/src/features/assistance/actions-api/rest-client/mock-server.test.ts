import { describe, test, expect, beforeEach, vi } from 'vitest';

import { isApiError } from '@shared/api';
import { ActionsMockRESTApiClient } from './mock-server.ts';

let client: ActionsMockRESTApiClient;

beforeEach(() => {
	const store = new Map<string, string>();

	vi.stubGlobal('localStorage', {
		getItem: (key: string) => store.get(key) ?? null,
		setItem: (key: string, value: string) => { store.set(key, value); },
		removeItem: (key: string) => { store.delete(key); },
		clear: () => { store.clear(); },
	});

	client = new ActionsMockRESTApiClient('actions-test');
});

describe('ActionsMockRESTApiClient', () => {
	test('lists the pending queue severity first', async () => {
		const { data, meta } = await client.list({});

		expect(data).toHaveLength(3);
		expect(data[0].severity).toBe('critical');
		expect(data[2].severity).toBe('info');
		expect(meta.total).toBe(3);
	});

	test('narrows the queue by source', async () => {
		const { data } = await client.list({ params: { source: 'assistant' } });

		expect(data.every((action) => action.source === 'assistant')).toBe(true);
	});

	test('answers an action and empties its resolutions', async () => {
		const [action] = (await client.list({})).data;

		const resolved = await client.resolve({ id: action.id, data: { resolution_id: 'top_up' } });

		expect(resolved.data.status).toBe('resolved');
		expect(resolved.data.resolved_at).not.toBeNull();
		expect(resolved.data.resolutions).toHaveLength(0);
		expect(resolved.data.deleted_at).toBeNull();
	});

	test('records a dismissal as its own state', async () => {
		const [action] = (await client.list({})).data;

		const dismissed = await client.resolve({ id: action.id, data: { resolution_id: 'dismiss' } });

		expect(dismissed.data.status).toBe('dismissed');
	});

	test('drops answered actions out of the pending queue', async () => {
		const [action] = (await client.list({})).data;
		await client.resolve({ id: action.id, data: { resolution_id: 'dismiss' } });

		const pending = await client.list({});
		const dismissed = await client.list({ params: { status: 'dismissed' } });

		expect(pending.data).toHaveLength(2);
		expect(dismissed.data).toHaveLength(1);
	});

	test('rejects a resolution the action does not offer', async () => {
		const [action] = (await client.list({})).data;

		await expect(client.resolve({ id: action.id, data: { resolution_id: 'apply' } })).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.code === 'unknown_resolution',
		);
	});

	test('rejects answering an action twice', async () => {
		const [action] = (await client.list({})).data;
		await client.resolve({ id: action.id, data: { resolution_id: 'dismiss' } });

		await expect(client.resolve({ id: action.id, data: { resolution_id: 'dismiss' } })).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.code === 'action_already_resolved',
		);
	});

	test('replays a repeated idempotency key', async () => {
		const [action] = (await client.list({})).data;
		const body = { resolution_id: 'dismiss' };

		const first = await client.resolve({ id: action.id, data: body, idempotencyKey: 'key-1' });
		const replay = await client.resolve({ id: action.id, data: body, idempotencyKey: 'key-1' });

		expect(first.meta.idempotent_replay).toBe(false);
		expect(replay.meta.idempotent_replay).toBe(true);
		expect(replay.data.id).toBe(first.data.id);
	});

	test('pages the queue with opaque cursors', async () => {
		const first = await client.list({ params: { limit: 2 } });

		expect(first.data).toHaveLength(2);
		expect(first.meta.next_cursor).not.toBeNull();

		const second = await client.list({ params: { limit: 2, cursor: first.meta.next_cursor ?? '' } });

		expect(second.data).toHaveLength(1);
		expect(second.meta.next_cursor).toBeNull();
	});
});
