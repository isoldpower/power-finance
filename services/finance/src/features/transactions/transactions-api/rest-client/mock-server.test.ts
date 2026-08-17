import { describe, test, expect, beforeEach, vi } from 'vitest';

import { isApiError } from '@shared/api';
import { TransactionMockRESTApiClient } from './mock-server.ts';
import type { TransactionCreateBody } from '../types.ts';

const WALLET = { id: 'wallet-1', name: 'Main Checking', deleted_at: null };
const CLOSED_WALLET = { id: 'wallet-2', name: 'Closed Card', deleted_at: '2026-08-01T00:00:00-05:00' };

let client: TransactionMockRESTApiClient;

const body = (name: string, overrides: Partial<TransactionCreateBody> = {}): TransactionCreateBody => ({
	name,
	currency: 'USD',
	amount: '25.00',
	wallet_id: WALLET.id,
	origin: 'manual',
	type: 'expense',
	category: 'Groceries',
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

	client = new TransactionMockRESTApiClient('transactions-test');
});

describe('TransactionMockRESTApiClient', () => {
	test('creates a transaction in the preview shape', async () => {
		const { data, meta } = await client.post({ data: body('Whole Foods'), idempotencyKey: 'key-1' });

		expect(meta.idempotent_replay).toBe(false);
		expect(data.money).toEqual({ amount: '25.00', currency: 'USD' });
		expect(data.wallet).toEqual({ id: WALLET.id, name: WALLET.name });
		expect(data.chain_id).toBeNull();
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

		const { data, meta } = await client.get({ id: created.data.id });

		expect(data.postings).toHaveLength(2);
		expect(data.postings.filter((posting) => posting.debit)).toHaveLength(1);
		expect(data.analysis.balanced).toBe(true);
		expect(meta.postings.total).toBe(2);
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
		expect(new Set(data.transactions.map((entry) => entry.chain_id))).toEqual(new Set([data.chain_id]));
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

	test('rejects an operator the field does not allow', async () => {
		await expect(client.search({
			data: { filter_body: { and: [{ field_name: 'created_at', operator: 'icontains', value: '2026' }] } },
		})).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.details[0]?.code === 'filter_operator_not_allowed',
		);
	});
});
