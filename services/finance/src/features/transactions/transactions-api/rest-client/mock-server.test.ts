import { describe, test, expect, beforeEach, vi } from 'vitest';

import { isApiError } from '@internal/shared';
import { builtInCategoryId } from '@feature/categories/categories-api';
import { TransactionsMockRESTApiClient } from './mock-server.ts';
import type { TransactionCreateBody } from '../types.ts';

const GROCERIES = builtInCategoryId('transaction', 'Groceries');
const HOUSING = builtInCategoryId('transaction', 'Housing');
const INCOME = builtInCategoryId('transaction', 'Income');

const WALLET = { id: 'wallet-1', name: 'Main Checking', deleted_at: null };
const CLOSED_WALLET = { id: 'wallet-2', name: 'Closed Card', deleted_at: '2026-08-01T00:00:00-05:00' };

let client: TransactionsMockRESTApiClient;

const body = (name: string, overrides: Partial<TransactionCreateBody> = {}): TransactionCreateBody => ({
	name,
	currency: 'USD',
	amount: '25.00',
	wallet_id: WALLET.id,
	origin: 'manual',
	type: 'expense',
	category_id: GROCERIES,
	evidence: null,
	...overrides,
});

beforeEach(() => {
	const store = new Map<string, string>();
	store.set('wallets-v1', JSON.stringify([WALLET, CLOSED_WALLET]));

	vi.stubGlobal('localStorage', {
		getItem: (key: string) => store.get(key) ?? null,
		setItem: (key: string, value: string) => { store.set(key, value); },
		removeItem: (key: string) => { store.delete(key); },
		clear: () => { store.clear(); },
	});

	client = new TransactionsMockRESTApiClient('transactions-test');
});

describe('TransactionsMockRESTApiClient', () => {
	test('creates a transaction in the preview shape', async () => {
		const { data, meta } = await client.post({ data: body('Whole Foods'), idempotencyKey: 'key-1' });

		expect(meta.idempotent_replay).toBe(false);
		expect(data.money).toEqual({ amount: '25.00', currency: 'USD' });
		expect(data.wallet).toEqual({ id: WALLET.id, name: WALLET.name });
		expect(data.chain).toBeNull();
	});

	test('replays a repeated key instead of creating twice', async () => {
		const first = await client.post({ data: body('Once'), idempotencyKey: 'key-2' });
		const replay = await client.post({ data: body('Once'), idempotencyKey: 'key-2' });
		const listed = await client.list({});

		expect(replay.meta.idempotent_replay).toBe(true);
		expect(replay.data.id).toBe(first.data.id);
		expect(listed.data).toHaveLength(1);
	});

	test('refuses to post against a closed wallet', async () => {
		await expect(client.post({
			data: body('Blocked', { wallet_id: CLOSED_WALLET.id }),
			idempotencyKey: 'key-3',
		})).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.code === 'wallet_closed',
		);
	});

	test('derives balanced double-entry postings for the detail shape', async () => {
		const created = await client.post({ data: body('Whole Foods'), idempotencyKey: 'key-4' });

		const { data } = await client.get({ id: created.data.id });

		expect(data.postings).toHaveLength(2);
		expect(data.postings.filter((posting) => posting.debit)).toHaveLength(1);
		expect(data.postings.map((posting) => posting.position)).toEqual([0, 1]);
		expect(data.postings.every((posting) => posting.account_id !== '')).toBe(true);
		expect(data.analysis?.balanced).toBe(true);
	});

	test('commits a chain and stamps both legs with the same chain id', async () => {
		const { data, meta } = await client.postChain({
			idempotencyKey: 'chain-1',
			data: {
				transactions: [
					{ ...body('Transfer out'), temporary_id: 'out', after: null },
					{ ...body('Transfer in', { type: 'income' }), temporary_id: 'in', after: 'out' },
				],
			},
		});

		expect(meta.idempotent_replay).toBe(false);
		expect(data.transactions).toHaveLength(2);
		expect(new Set(data.transactions.map((entry) => entry.chain?.id))).toEqual(new Set([data.chain_id]));
		expect(data.transactions.map((entry) => entry.chain?.size)).toEqual([2, 2]);
	});

	test('rejects a chain whose after references form a cycle', async () => {
		await expect(client.postChain({
			idempotencyKey: 'chain-2',
			data: {
				transactions: [
					{ ...body('First'), temporary_id: 'one', after: 'two' },
					{ ...body('Second'), temporary_id: 'two', after: 'one' },
				],
			},
		})).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.code === 'chain_cycle',
		);
	});

	test('rejects a chain referencing an unknown temporary id', async () => {
		await expect(client.postChain({
			idempotencyKey: 'chain-3',
			data: {
				transactions: [{ ...body('Orphan'), temporary_id: 'one', after: 'missing' }],
			},
		})).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.code === 'chain_unknown_reference',
		);
	});

	test('starts a chain around an existing transaction', async () => {
		const existing = await client.post({ data: body('Dinner'), idempotencyKey: 'key-existing' });
		const { data } = await client.postChain({
			idempotencyKey: 'chain-existing',
			data: {
				transactions: [
					{ temporary_id: 'adjusted', after: null, transaction_id: existing.data.id },
					{ ...body('Refund', { type: 'income', amount: '5.00' }), temporary_id: 'refund', after: 'adjusted' },
				],
			},
		});

		expect(data.transactions.map((item) => item.name)).toEqual(['Dinner', 'Refund']);
		expect(data.transactions[0]?.id).toBe(existing.data.id);
		expect(data.transactions.every((item) => item.chain?.id === data.chain_id && item.chain.size === 2)).toBe(true);
	});

	test('refuses to chain a transaction that already belongs to a chain', async () => {
		const chain = await client.postChain({
			idempotencyKey: 'chain-taken',
			data: { transactions: [{ ...body('First'), temporary_id: 'a', after: null }] },
		});
		const takenId = chain.data.transactions[0]?.id ?? '';

		await expect(client.postChain({
			idempotencyKey: 'chain-retake',
			data: { transactions: [{ temporary_id: 'x', after: null, transaction_id: takenId }] },
		})).rejects.toSatisfy((error) => isApiError(error) && error.code === 'conflict');
	});

	test('appends one transaction to an existing chain and returns it last', async () => {
		const chain = await client.postChain({
			idempotencyKey: 'chain-base',
			data: {
				transactions: [
					{ ...body('Out'), temporary_id: 'out', after: null },
					{ ...body('In', { type: 'income' }), temporary_id: 'in', after: 'out' },
				],
			},
		});
		const { data } = await client.appendChain({
			chainId: chain.data.chain_id,
			data: body('Fee', { amount: '1.00' }),
			idempotencyKey: 'append-1',
		});

		expect(data.transactions.map((item) => item.name)).toEqual(['Out', 'In', 'Fee']);
		expect(data.transactions.every((item) => item.chain?.size === 3)).toBe(true);
	});

	test('cancels a whole chain and drops it from the feed', async () => {
		const chain = await client.postChain({
			idempotencyKey: 'chain-4',
			data: {
				transactions: [
					{ ...body('Transfer out'), temporary_id: 'out', after: null },
					{ ...body('Transfer in', { type: 'income' }), temporary_id: 'in', after: 'out' },
				],
			},
		});

		const cancelled = await client.deleteChain({ chainId: chain.data.chain_id });
		const listed = await client.list({});

		expect(cancelled.data.transactions.every((entry) => entry.deleted_at !== null)).toBe(true);
		expect(listed.data).toHaveLength(0);
	});

	test('excludes cancelled transactions from search', async () => {
		const created = await client.post({ data: body('Cancelled'), idempotencyKey: 'key-5' });
		await client.delete({ id: created.data.id });

		const { data } = await client.search({
			data: { filter_body: { and: [{ field_name: 'wallet_id', operator: 'eq', value: WALLET.id }] } },
		});

		expect(data).toHaveLength(0);
	});

	test('returns newest first by default and flips when the search asks for ascending', async () => {
		await client.post({ data: body('First'), idempotencyKey: 'order-1' });
		await client.post({ data: body('Second'), idempotencyKey: 'order-2' });
		await client.post({ data: body('Third'), idempotencyKey: 'order-3' });

		const filter = { filter_body: { and: [{ field_name: 'wallet_id' as const, operator: 'eq' as const, value: WALLET.id }] } };

		const newest = await client.search({ data: filter });
		const oldest = await client.search({ data: filter, params: { order: 'ASC' } });

		expect(newest.data.map((entry) => entry.name)).toEqual(['Third', 'Second', 'First']);
		expect(oldest.data.map((entry) => entry.name)).toEqual(['First', 'Second', 'Third']);
	});

	test('binds a search cursor to the requested order', async () => {
		await client.post({ data: body('One'), idempotencyKey: 'cursor-1' });
		await client.post({ data: body('Two'), idempotencyKey: 'cursor-2' });

		const filter = { filter_body: { and: [{ field_name: 'wallet_id' as const, operator: 'eq' as const, value: WALLET.id }] } };
		const first = await client.search({ data: filter, params: { limit: 1 } });

		expect(first.meta.next_cursor).not.toBeNull();

		await expect(client.search({
			data: filter,
			params: { limit: 1, cursor: first.meta.next_cursor ?? '', order: 'ASC' },
		})).rejects.toSatisfy(isApiError);
	});

	test('narrows a search by type, category and text across name and category', async () => {
		await client.post({ data: body('Whole Foods', { category_id: GROCERIES }), idempotencyKey: 'n-1' });
		await client.post({ data: body('Rent', { category_id: HOUSING, amount: '900.00' }), idempotencyKey: 'n-2' });
		await client.post({ data: body('Salary', { category_id: INCOME, type: 'income' }), idempotencyKey: 'n-3' });

		const income = await client.search({
			data: { filter_body: { and: [{ field_name: 'type', operator: 'in', value: ['income'] }] } },
		});
		const housing = await client.search({
			data: { filter_body: { and: [{ field_name: 'category', operator: 'in', value: ['Housing'] }] } },
		});
		const needle = await client.search({
			data: {
				filter_body: {
					and: [{
						or: [
							{ field_name: 'name', operator: 'icontains', value: 'gROcer' },
							{ field_name: 'category', operator: 'icontains', value: 'gROcer' },
						],
					}],
				},
			},
		});

		expect(income.data.map((entry) => entry.name)).toEqual(['Salary']);
		expect(housing.data.map((entry) => entry.name)).toEqual(['Rent']);
		expect(needle.data.map((entry) => entry.name)).toEqual(['Whole Foods']);
	});

	test('filters by category id and returns the category object', async () => {
		await client.post({ data: body('Whole Foods'), idempotencyKey: 'c-1' });
		await client.post({ data: body('Rent', { category_id: HOUSING }), idempotencyKey: 'c-2' });

		const { data } = await client.search({
			data: { filter_body: { and: [{ field_name: 'category_id', operator: 'in', value: [HOUSING] }] } },
		});

		expect(data.map((entry) => entry.category)).toEqual([{ id: HOUSING, name: 'Housing', is_global: true }]);
	});

	test('refuses a category that does not exist', async () => {
		await expect(client.post({
			data: body('Mystery', { category_id: 'missing' }),
			idempotencyKey: 'c-3',
		})).rejects.toSatisfy((error: unknown) => isApiError(error) && error.code === 'not_found');
	});

	test('refuses a wallet category on a transaction', async () => {
		await expect(client.post({
			data: body('Mismatch', { category_id: builtInCategoryId('wallet', 'Cash') }),
			idempotencyKey: 'c-4',
		})).rejects.toSatisfy((error: unknown) => isApiError(error) && error.code === 'validation_failed');
	});

	test('reports the narrowed total so paging stays truthful', async () => {
		await client.post({ data: body('Whole Foods'), idempotencyKey: 't-1' });
		await client.post({ data: body('Rent', { category_id: HOUSING }), idempotencyKey: 't-2' });
		await client.post({ data: body('Salary', { category_id: INCOME, type: 'income' }), idempotencyKey: 't-3' });

		const { meta } = await client.search({
			data: { filter_body: { and: [{ field_name: 'type', operator: 'in', value: ['expense'] }] } },
			params: { limit: 1 },
		});

		expect(meta.total).toBe(2);
		expect(meta.next_cursor).not.toBeNull();
	});

	test('rejects an operator the field does not allow', async () => {
		await expect(client.search({
			data: { filter_body: { and: [{ field_name: 'created_at', operator: 'icontains', value: '2026' }] } },
		})).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.details[0]?.code === 'filter_operator_not_allowed',
		);
	});
});
