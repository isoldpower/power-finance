import { describe, test, expect, beforeEach, vi } from 'vitest';

import { isApiError } from '@shared/api';
import { WebhookMockRESTApiClient } from './mock-server.ts';

let client: WebhookMockRESTApiClient;

const draft = (title = 'Ledger sync', url = 'https://hooks.example.com/finance/ledger') => ({
	title,
	url,
	enabled: true,
});

beforeEach(() => {
	const store = new Map<string, string>();

	vi.stubGlobal('localStorage', {
		getItem: (key: string) => store.get(key) ?? null,
		setItem: (key: string, value: string) => { store.set(key, value); },
		removeItem: (key: string) => { store.delete(key); },
		clear: () => { store.clear(); },
	});

	client = new WebhookMockRESTApiClient('webhooks-test', 'subscriptions-test', 'deliveries-test');
});

describe('WebhookMockRESTApiClient', () => {
	test('returns the secret on creation and never on a read', async () => {
		const created = await client.post({ data: draft('Alerts', 'https://hooks.example.com/alerts') });
		const fetched = await client.get({ id: created.data.id });
		const listed = await client.list({});

		expect(created.data.secret).toMatch(/^whsec_[0-9a-f]{48}$/);
		expect(fetched.data).not.toHaveProperty('secret');
		expect(listed.data.every((webhook) => !('secret' in webhook))).toBe(true);
	});

	test('rejects a url that is not absolute http or https', async () => {
		await expect(client.post({ data: draft('Bad', 'hooks.example.com/finance') })).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.details[0]?.code === 'url_scheme',
		);
	});

	test('rotates the secret and keeps the endpoint identity', async () => {
		const created = await client.post({ data: draft('Rotate me', 'https://hooks.example.com/rotate') });

		const rotated = await client.rotateSecret({ id: created.data.id });

		expect(rotated.data.id).toBe(created.data.id);
		expect(rotated.data.secret).not.toBe(created.data.secret);
		expect(rotated.data.updated_at).not.toBeNull();
	});

	test('hard-deletes an endpoint and its subscriptions', async () => {
		const created = await client.post({ data: draft('Doomed', 'https://hooks.example.com/doomed') });
		await client.subscribe({ webhookId: created.data.id, data: { event: 'wallet.created' } });

		await client.delete({ id: created.data.id });

		await expect(client.get({ id: created.data.id })).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.code === 'not_found',
		);
	});

	test('serves the event catalog unpaginated', async () => {
		const { data, meta } = await client.eventTypes({});

		expect(meta.limit).toBeNull();
		expect(data).toHaveLength(6);
		expect(data[0]).toHaveProperty('subject');
	});

	test('subscribes an endpoint to a published event type', async () => {
		const created = await client.post({ data: draft('Subs', 'https://hooks.example.com/subs') });

		const subscription = await client.subscribe({
			webhookId: created.data.id,
			data: { event: 'transaction.created' },
		});
		const listed = await client.listSubscriptions({ webhookId: created.data.id });

		expect(subscription.data.webhook_id).toBe(created.data.id);
		expect(listed.data).toHaveLength(1);
	});

	test('rejects an event type outside the catalog', async () => {
		const created = await client.post({ data: draft('Subs', 'https://hooks.example.com/subs') });

		await expect(client.subscribe({
			webhookId: created.data.id,
			data: { event: 'wallet.exploded' },
		})).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.details[0]?.code === 'unknown_event_type',
		);
	});

	test('rejects a duplicate subscription as a conflict', async () => {
		const created = await client.post({ data: draft('Subs', 'https://hooks.example.com/subs') });
		await client.subscribe({ webhookId: created.data.id, data: { event: 'goal.reached' } });

		await expect(client.subscribe({
			webhookId: created.data.id,
			data: { event: 'goal.reached' },
		})).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.code === 'subscription_exists',
		);
	});

	test('unsubscribes by subscription id', async () => {
		const created = await client.post({ data: draft('Subs', 'https://hooks.example.com/subs') });
		const subscription = await client.subscribe({
			webhookId: created.data.id,
			data: { event: 'wallet.updated' },
		});

		await client.unsubscribe({ webhookId: created.data.id, subscriptionId: subscription.data.id });
		const listed = await client.listSubscriptions({ webhookId: created.data.id });

		expect(listed.data).toHaveLength(0);
	});

	test('serves an empty delivery log for a fresh endpoint', async () => {
		const created = await client.post({ data: draft('Quiet', 'https://hooks.example.com/quiet') });

		const { data, meta } = await client.listDeliveries({ webhookId: created.data.id });

		expect(data).toHaveLength(0);
		expect(meta.total).toBe(0);
	});

	test('pages the endpoint list with opaque cursors', async () => {
		const first = await client.list({ params: { limit: 1 } });
		const second = await client.list({ params: { limit: 1, cursor: first.meta.next_cursor ?? '' } });

		expect(first.data).toHaveLength(1);
		expect(second.data).toHaveLength(1);
		expect(second.data[0].id).not.toBe(first.data[0].id);
	});
});
