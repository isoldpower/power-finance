import { describe, test, expect, beforeEach, vi } from 'vitest';

import { isApiError } from '@shared/api';
import { WalletsMockRESTApiClient } from './mock-server.ts';
import type { WalletSearchField } from '../types.ts';

let client: WalletsMockRESTApiClient;

const draft = (name: string, openingBalance = '0.00') => ({
	name,
	color: '#FF0000',
	opening_balance: openingBalance,
	zero_balance: '0.00',
	currency: 'USD',
	category: 'Savings',
});

beforeEach(() => {
	const store = new Map<string, string>();

	vi.stubGlobal('localStorage', {
		getItem: (key: string) => store.get(key) ?? null,
		setItem: (key: string, value: string) => { store.set(key, value); },
		removeItem: (key: string) => { store.delete(key); },
		clear: () => { store.clear(); },
	});

	client = new WalletsMockRESTApiClient('wallets-test');
});

describe('WalletsMockRESTApiClient', () => {
	test('wraps a created wallet in the mutation envelope', async () => {
		const response = await client.post({ data: draft('Travel Card') });

		expect(response.meta.idempotent_replay).toBe(false);
		expect(response.data.name).toBe('Travel Card');
		expect(response.data.money).toEqual({ amount: '0.00', currency: 'USD' });
		expect(response.data.deleted_at).toBeNull();
	});

	test('replays a repeated idempotency key without creating a second wallet', async () => {
		const first = await client.post({ data: draft('Once'), idempotencyKey: 'key-1' });
		const replay = await client.post({ data: draft('Once'), idempotencyKey: 'key-1' });
		const listed = await client.list({});

		expect(replay.meta.idempotent_replay).toBe(true);
		expect(replay.data.id).toBe(first.data.id);
		expect(listed.data).toHaveLength(1);
	});

	test('rejects a reused key carrying a different body', async () => {
		await client.post({ data: draft('First'), idempotencyKey: 'key-2' });

		await expect(client.post({ data: draft('Second'), idempotencyKey: 'key-2' })).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.code === 'idempotency_key_reuse',
		);
	});

	test('leads the list with favorites', async () => {
		await client.post({ data: draft('Plain') });
		const starred = await client.post({ data: draft('Starred') });
		await client.patch({ id: starred.data.id, data: { favorite: true } });

		const { data } = await client.list({});

		expect(data[0].name).toBe('Starred');
	});

	test('pages through the collection with opaque cursors', async () => {
		await client.post({ data: draft('One') });
		await client.post({ data: draft('Two') });
		await client.post({ data: draft('Three') });

		const first = await client.list({ params: { limit: 2 } });
		expect(first.data).toHaveLength(2);
		expect(first.meta.total).toBe(3);
		expect(first.meta.prev_cursor).toBeNull();
		expect(first.meta.next_cursor).not.toBeNull();

		const second = await client.list({ params: { limit: 2, cursor: first.meta.next_cursor ?? '' } });
		expect(second.data).toHaveLength(1);
		expect(second.meta.next_cursor).toBeNull();
		expect(second.meta.prev_cursor).not.toBeNull();
	});

	test('rejects a cursor issued for a different query', async () => {
		await client.post({ data: draft('One') });
		await client.post({ data: draft('Two') });

		const listed = await client.list({ params: { limit: 1 } });

		await expect(client.search({
			data: { filter_body: { and: [{ field_name: 'currency', operator: 'eq', value: 'USD' }] } },
			params: { limit: 1, cursor: listed.meta.next_cursor ?? '' },
		})).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.code === 'cursor_mismatch',
		);
	});

	test('refuses to close a wallet that still holds money', async () => {
		const created = await client.post({ data: draft('Funded', '50.00') });

		await expect(client.delete({ id: created.data.id })).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.code === 'wallet_not_empty',
		);
	});

	test('closes an empty wallet and keeps the call idempotent', async () => {
		const created = await client.post({ data: draft('Empty') });

		const closed = await client.delete({ id: created.data.id });
		const repeated = await client.delete({ id: created.data.id });
		const listed = await client.list({});

		expect(closed.data.deleted_at).not.toBeNull();
		expect(repeated.data.deleted_at).toBe(closed.data.deleted_at);
		expect(listed.data).toHaveLength(0);
	});

	test('rejects a filter on a field outside the whitelist', async () => {
		await expect(client.search({
			data: { filter_body: { and: [{ field_name: 'color' as WalletSearchField, operator: 'eq', value: '#FF0000' }] } },
		})).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.details[0]?.code === 'filter_unknown_field',
		);
	});

	test('narrows the search by name', async () => {
		await client.post({ data: draft('Travel Card') });
		await client.post({ data: draft('Grocery Cash') });

		const { data } = await client.search({
			data: { filter_body: { and: [{ field_name: 'name', operator: 'icontains', value: 'travel' }] } },
		});

		expect(data).toHaveLength(1);
		expect(data[0].name).toBe('Travel Card');
	});
});
