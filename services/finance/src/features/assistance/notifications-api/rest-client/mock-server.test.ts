import { describe, test, expect, beforeEach, vi } from 'vitest';

import { isApiError } from '@shared/api';
import { NotificationsMockRESTApiClient } from './mock-server.ts';
import type { NotificationAcknowledgedDto } from '../types.ts';

let client: NotificationsMockRESTApiClient;

beforeEach(() => {
	const store = new Map<string, string>();

	vi.stubGlobal('localStorage', {
		getItem: (key: string) => store.get(key) ?? null,
		setItem: (key: string, value: string) => { store.set(key, value); },
		removeItem: (key: string) => { store.delete(key); },
		clear: () => { store.clear(); },
	});

	client = new NotificationsMockRESTApiClient('notifications-test');
});

describe('NotificationsMockRESTApiClient', () => {
	test('orders the feed newest first with no severity ranking', async () => {
		const { data } = await client.list({});

		expect(data).toHaveLength(4);
		expect(new Date(data[0].created_at).getTime()).toBeGreaterThan(new Date(data[1].created_at).getTime());
	});

	test('narrows the feed to unread', async () => {
		const { data } = await client.list({ params: { acknowledged: false } });

		expect(data).toHaveLength(3);
		expect(data.every((notification) => notification.acknowledged_at === null)).toBe(true);
	});

	test('counts unacknowledged separately from total', async () => {
		const { data } = await client.count({});

		expect(data).toEqual({ unacknowledged: 3, total: 4 });
	});

	test('acknowledging stamps a timestamp and moves the badge', async () => {
		const [notification] = (await client.list({ params: { acknowledged: false } })).data;

		const acknowledged = await client.ack({ id: notification.id });
		const { data: counts } = await client.count({});

		expect(acknowledged.data.acknowledged_at).not.toBeNull();
		expect(counts.unacknowledged).toBe(2);
	});

	test('acknowledging twice keeps the original timestamp', async () => {
		const [notification] = (await client.list({ params: { acknowledged: false } })).data;

		const first = await client.ack({ id: notification.id });
		const repeated = await client.ack({ id: notification.id });

		expect(repeated.data.acknowledged_at).toBe(first.data.acknowledged_at);
	});

	test('rejects acknowledging an unknown notification', async () => {
		await expect(client.ack({ id: 'missing' })).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.code === 'not_found',
		);
	});

	test('streams an acknowledgement to other listeners', async () => {
		const seen: NotificationAcknowledgedDto[] = [];
		const close = client.stream({
			onCreated: () => undefined,
			onAcknowledged: (event) => { seen.push(event); },
		});

		const [notification] = (await client.list({ params: { acknowledged: false } })).data;
		await client.ack({ id: notification.id });
		close();
		await client.ack({ id: (await client.list({ params: { acknowledged: false } })).data[0].id });

		expect(seen).toHaveLength(1);
		expect(seen[0].id).toBe(notification.id);
	});

	test('pages the feed with opaque cursors', async () => {
		const first = await client.list({ params: { limit: 3 } });
		const second = await client.list({ params: { limit: 3, cursor: first.meta.next_cursor ?? '' } });

		expect(first.data).toHaveLength(3);
		expect(second.data).toHaveLength(1);
		expect(second.meta.prev_cursor).not.toBeNull();
	});
});
