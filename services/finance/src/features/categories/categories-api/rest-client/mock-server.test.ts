import { beforeEach, describe, expect, test, vi } from 'vitest';

import { isApiError } from '@internal/shared';
import { CategoriesMockRESTApiClient } from './mock-server.ts';
import { CategoryCatalogMock } from './mock-catalog.ts';
import { builtInCategoryId } from './mock-seed.ts';


const STORAGE_KEY = 'categories-test';

let client: CategoriesMockRESTApiClient;
let catalog: CategoryCatalogMock;

const failsWith = (code: string) => (error: unknown): boolean => isApiError(error) && error.code === code;

beforeEach(() => {
	const store = new Map<string, string>();

	vi.stubGlobal('localStorage', {
		getItem: (key: string) => store.get(key) ?? null,
		setItem: (key: string, value: string) => { store.set(key, value); },
		removeItem: (key: string) => { store.delete(key); },
		clear: () => { store.clear(); },
	});

	client = new CategoriesMockRESTApiClient(STORAGE_KEY);
	catalog = new CategoryCatalogMock(STORAGE_KEY);
});

describe('CategoriesMockRESTApiClient', () => {
	test('lists built-in categories first, then own ones, each A to Z', async () => {
		await client.post({ data: { kind: 'wallet', name: 'Brokerage' }, idempotencyKey: 'k-1' });
		await client.post({ data: { kind: 'wallet', name: 'Allowance' }, idempotencyKey: 'k-2' });

		const { data } = await client.list({ params: { kind: 'wallet', limit: 100 } });
		const names = data.map((category) => category.name);

		expect(names.slice(0, 7)).toEqual(['Banking', 'Cash', 'Credit', 'Investments', 'Other', 'Savings', 'Travel']);
		expect(names.slice(7)).toEqual(['Allowance', 'Brokerage']);
	});

	test('filters by kind', async () => {
		const { data } = await client.list({ params: { kind: 'transaction', limit: 100 } });

		expect(data.every((category) => category.kind === 'transaction')).toBe(true);
		expect(data).toHaveLength(17);
	});

	test('trims the name and replays an idempotent create', async () => {
		const first = await client.post({ data: { kind: 'transaction', name: '  Pets  ' }, idempotencyKey: 'pets' });
		const again = await client.post({ data: { kind: 'transaction', name: '  Pets  ' }, idempotencyKey: 'pets' });

		expect(first.data).toMatchObject({ name: 'Pets', is_global: false, deleted_at: null });
		expect(again.meta.idempotent_replay).toBe(true);
		expect(again.data.id).toBe(first.data.id);
	});

	test('refuses a name already used by a built-in category of the same kind, in any case', async () => {
		await expect(client.post({ data: { kind: 'transaction', name: 'groceries' }, idempotencyKey: 'dup' }))
			.rejects.toSatisfy(failsWith('conflict'));
	});

	test('allows the same name across kinds', async () => {
		const { data } = await client.post({ data: { kind: 'transaction', name: 'Cash' }, idempotencyKey: 'cash' });

		expect(data.kind).toBe('transaction');
	});

	test('renames an own category and refuses to rename a built-in one', async () => {
		const { data } = await client.post({ data: { kind: 'transaction', name: 'Pets' }, idempotencyKey: 'pets' });
		const renamed = await client.patch({ id: data.id, data: { name: 'Pet care' } });

		expect(renamed.data.name).toBe('Pet care');
		await expect(client.patch({ id: builtInCategoryId('transaction', 'Food'), data: { name: 'Meals' } }))
			.rejects.toSatisfy(failsWith('conflict'));
	});

	test('soft-deletes: the category leaves the list but still resolves for existing items', async () => {
		const { data } = await client.post({ data: { kind: 'transaction', name: 'Pets' }, idempotencyKey: 'pets' });
		await client.delete({ id: data.id });

		const listed = await client.list({ params: { kind: 'transaction', limit: 100 } });

		expect(listed.data.some((category) => category.id === data.id)).toBe(false);
		expect(catalog.refOf(data.id)).toEqual({ id: data.id, name: 'Pets', is_global: false });
		expect(() => catalog.requireAssignable(data.id, 'transaction')).toThrow();
	});

	test('lets a deleted name be reused', async () => {
		const { data } = await client.post({ data: { kind: 'transaction', name: 'Pets' }, idempotencyKey: 'pets' });
		await client.delete({ id: data.id });

		const reused = await client.post({ data: { kind: 'transaction', name: 'Pets' }, idempotencyKey: 'pets-2' });

		expect(reused.data.id).not.toBe(data.id);
	});

	test('answers not_found for a deleted or unknown category', async () => {
		const { data } = await client.post({ data: { kind: 'wallet', name: 'Vault' }, idempotencyKey: 'vault' });
		await client.delete({ id: data.id });

		await expect(client.delete({ id: data.id })).rejects.toSatisfy(failsWith('not_found'));
		await expect(client.patch({ id: 'missing', data: { name: 'x' } })).rejects.toSatisfy(failsWith('not_found'));
	});

	test('refuses an unknown kind', async () => {
		await expect(client.list({ params: { kind: 'goal' as never } })).rejects.toSatisfy(failsWith('validation_failed'));
	});
});
