import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useOptimisticTransactions } from './use-optimistic-transactions.ts';

import type { FC, ReactNode } from 'react';
import type { Page } from '@shared/api';
import type {
	Transaction,
	TransactionDetails,
	TransactionDraft,
} from '@entity/transactions';
import type { FetchTransactionResponse } from '../../transactions-api';
import type { TransactionCachesSnapshot, TransactionPageResponse } from './types.ts';


const LIST_KEY = ['transactions', 'default', 'first'];
const LIST_SECOND_KEY = ['transactions', 'default', 'cursor-2'];
const GROCERY_SEARCH_KEY = ['transactionsSearch', { search: 'coffee' }, 'default', 'first'];
const RENT_SEARCH_KEY = ['transactionsSearch', { search: 'rent' }, 'default', 'first'];
const DETAIL_KEY = ['transaction', 't1'];
const LEDGER_KEY = ['transactionLedger', 't1'];
const WALLETS_KEY = ['wallets', 'default', 'first'];

const buildTransaction = (overrides: Partial<Transaction> = {}): Transaction => ({
	id: 't1',
	name: 'Coffee beans',
	createdAt: '2026-03-01T00:00:00.000Z',
	updatedAt: null,
	deletedAt: null,
	money: { amount: '12.50', currency: 'USD' },
	type: 'expense',
	origin: 'manual',
	wallet: { id: 'w1', name: 'Everyday' },
	category: 'Groceries',
	chain: null,
	...overrides,
});

const buildDraft = (overrides: Partial<TransactionDraft> = {}): TransactionDraft => ({
	name: 'Coffee refill',
	currency: 'USD',
	amount: '4.00',
	walletId: 'w1',
	origin: 'manual',
	type: 'expense',
	category: 'Groceries',
	evidence: null,
	...overrides,
});

const buildPage = (items: Transaction[]): Page<Transaction> => ({
	items,
	limit: 25,
	total: items.length,
	nextCursor: null,
	prevCursor: null,
});

const buildDetails = (transaction: Transaction): FetchTransactionResponse => ({
	transaction: { ...transaction, evidence: null, analysis: null } satisfies TransactionDetails,
	postings: [],
});

const seed = (client: QueryClient): void => {
	client.setQueryData(LIST_KEY, { page: buildPage([buildTransaction()]) });
	client.setQueryData(LIST_SECOND_KEY, { page: buildPage([buildTransaction({ id: 't9', name: 'Rent' })]) });
	client.setQueryData(GROCERY_SEARCH_KEY, { page: buildPage([buildTransaction()]) });
	client.setQueryData(RENT_SEARCH_KEY, { page: buildPage([]) });
	client.setQueryData(DETAIL_KEY, buildDetails(buildTransaction()));
	client.setQueryData(LEDGER_KEY, buildDetails(buildTransaction()));
	client.setQueryData(WALLETS_KEY, {
		page: { items: [{ id: 'w1', name: 'Everyday' }], limit: 25, total: 1, nextCursor: null, prevCursor: null },
	});
};

const pageOf = (client: QueryClient, key: unknown[]): Page<Transaction> => {
	const response = client.getQueryData<TransactionPageResponse>(key);
	if (!response) throw new Error(`No cache entry for ${JSON.stringify(key)}`);

	return response.page;
};

const detailOf = (client: QueryClient, key: unknown[]): TransactionDetails => {
	const response = client.getQueryData<FetchTransactionResponse>(key);
	if (!response) throw new Error(`No detail cached for ${JSON.stringify(key)}`);

	return response.transaction;
};

const buildWrapper = (client: QueryClient): FC<{ children: ReactNode }> => {
	const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
		<QueryClientProvider client={client}>{children}</QueryClientProvider>
	);

	return Wrapper;
};

const renderOptimistic = () => {
	const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	seed(client);

	const { result } = renderHook(() => useOptimisticTransactions(), { wrapper: buildWrapper(client) });

	return { client, result };
};

describe('useOptimisticTransactions', () => {
	test('applies a patch to the list, the search results and both detail caches', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyPatch('t1', { name: 'Coffee beans deluxe' });
		});

		expect(pageOf(client, LIST_KEY).items[0]?.name).toBe('Coffee beans deluxe');
		expect(pageOf(client, GROCERY_SEARCH_KEY).items[0]?.name).toBe('Coffee beans deluxe');
		expect(detailOf(client, DETAIL_KEY).name).toBe('Coffee beans deluxe');
		expect(detailOf(client, LEDGER_KEY).name).toBe('Coffee beans deluxe');
	});

	test('clears a category when the patch carries an explicit null', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyPatch('t1', { category: null });
		});

		expect(pageOf(client, LIST_KEY).items[0]?.category).toBeNull();
		expect(detailOf(client, DETAIL_KEY).category).toBeNull();
	});

	test('leaves the category alone when the patch omits it', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyPatch('t1', { name: 'Renamed' });
		});

		expect(pageOf(client, LIST_KEY).items[0]?.category).toBe('Groceries');
	});

	test('rewrites the amount for an adjustment and keeps the currency', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyAdjust('t1', '18.00');
		});

		expect(pageOf(client, LIST_KEY).items[0]?.money).toEqual({ amount: '18.00', currency: 'USD' });
		expect(detailOf(client, LEDGER_KEY).money.amount).toBe('18.00');
	});

	test('restores every touched cache when the mutation fails', async () => {
		const { client, result } = renderOptimistic();

		let snapshot: TransactionCachesSnapshot | undefined;
		await act(async () => {
			snapshot = await result.current.capture();
			result.current.applyPatch('t1', { name: 'Coffee beans deluxe' });
		});

		act(() => {
			result.current.restore(snapshot);
		});

		expect(pageOf(client, LIST_KEY).items[0]?.name).toBe('Coffee beans');
		expect(pageOf(client, GROCERY_SEARCH_KEY).items[0]?.name).toBe('Coffee beans');
		expect(detailOf(client, DETAIL_KEY).name).toBe('Coffee beans');
	});

	test('projects a draft into a transaction that borrows the cached wallet name', () => {
		const { result } = renderOptimistic();

		const projected = result.current.project({ drafts: [buildDraft()], chained: false });
		const [transaction] = projected.transactions;

		expect(transaction.wallet).toEqual({ id: 'w1', name: 'Everyday' });
		expect(transaction.money).toEqual({ amount: '4.00', currency: 'USD' });
		expect(transaction.chain).toBeNull();
		expect(projected.temporaryIds).toEqual(projected.transactions.map((item) => item.id));
	});

	test('gives every entry of a chain the same temporary chain id', () => {
		const { result } = renderOptimistic();

		const projected = result.current.project({
			drafts: [buildDraft(), buildDraft({ name: 'Transfer in', type: 'income' })],
			chained: true,
		});
		const [first, second] = projected.transactions;

		expect(projected.transactions).toHaveLength(2);
		expect(first.chain?.id).toBeDefined();
		expect(second.chain?.id).toBe(first.chain?.id);
		expect(first.chain?.size).toBe(2);
		expect(first.id).not.toBe(second.id);
	});

	test('prepends created transactions only to first pages that accept them', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyCreate([
				buildTransaction({ id: 'temp-1', name: 'Coffee refill' }),
				buildTransaction({ id: 'temp-2', name: 'Coffee filter' }),
			]);
		});

		expect(pageOf(client, LIST_KEY).items.map((item) => item.id)).toEqual(['temp-1', 'temp-2', 't1']);
		expect(pageOf(client, LIST_KEY).total).toBe(3);
		expect(pageOf(client, LIST_SECOND_KEY).items.map((item) => item.id)).toEqual(['t9']);
		expect(pageOf(client, GROCERY_SEARCH_KEY).items).toHaveLength(3);
		expect(pageOf(client, RENT_SEARCH_KEY).items).toEqual([]);
	});

	test('swaps the whole optimistic batch for what the chain endpoint returned', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyCreate([
				buildTransaction({ id: 'temp-1', name: 'Coffee refill' }),
				buildTransaction({ id: 'temp-2', name: 'Coffee filter' }),
			]);
			result.current.applySettledBatch(['temp-1', 'temp-2'], [
				buildTransaction({ id: 't3', name: 'Coffee filter', chain: { id: 'c1', size: 2 } }),
				buildTransaction({ id: 't2', name: 'Coffee refill', chain: { id: 'c1', size: 2 } }),
			]);
		});

		expect(pageOf(client, LIST_KEY).items.map((item) => item.id)).toEqual(['t3', 't2', 't1']);
		expect(pageOf(client, LIST_KEY).total).toBe(3);
	});

	test('drops a settled transaction from searches it no longer matches', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applySettled('t1', buildTransaction({ name: 'Rent', category: null }));
		});

		expect(pageOf(client, LIST_KEY).items[0]?.name).toBe('Rent');
		expect(pageOf(client, GROCERY_SEARCH_KEY).items).toEqual([]);
		expect(pageOf(client, GROCERY_SEARCH_KEY).total).toBe(0);
	});

	test('removes a cancelled transaction from the pages and marks both details cancelled', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyRemove('t1', '2026-09-08T10:00:00.000Z');
		});

		expect(pageOf(client, LIST_KEY).items).toEqual([]);
		expect(pageOf(client, GROCERY_SEARCH_KEY).items).toEqual([]);
		expect(detailOf(client, DETAIL_KEY).deletedAt).toBe('2026-09-08T10:00:00.000Z');
		expect(detailOf(client, LEDGER_KEY).deletedAt).toBe('2026-09-08T10:00:00.000Z');
	});
});
