import { beforeEach, describe, expect, test, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useDeleteTransactions } from './use-delete-transactions.ts';

import type { FC, ReactNode } from 'react';
import type { Page } from '@shared/api';
import type { PagedResponse } from '@shared/data';
import type { Transaction } from '@entity/transactions';


const LIST_KEY = ['transactions', 'default', 'first'];

const deleteTransaction = vi.hoisted(() => vi.fn());

vi.mock('../transactions-api', () => ({ deleteTransaction }));
vi.mock('@app/api', async (importOriginal) => ({
	...await importOriginal<Record<string, unknown>>(),
	useApiContext: () => ({ transactionServers: { rest: {} } }),
}));

const buildTransaction = (id: string): Transaction => ({
	id,
	name: `Entry ${id}`,
	createdAt: '2026-03-01T00:00:00.000Z',
	updatedAt: null,
	deletedAt: null,
	money: { amount: '10.00', currency: 'USD' },
	type: 'expense',
	origin: 'manual',
	wallet: { id: 'w1', name: 'Everyday' },
	category: null,
	chain: null,
});

const buildPage = (items: Transaction[]): Page<Transaction> => ({
	items,
	limit: 25,
	total: items.length,
	nextCursor: null,
	prevCursor: null,
});

const buildWrapper = (client: QueryClient): FC<{ children: ReactNode }> => {
	const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
		<QueryClientProvider client={client}>{children}</QueryClientProvider>
	);

	return Wrapper;
};

const renderDelete = () => {
	const client = new QueryClient({
		defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
	});
	client.setQueryData(LIST_KEY, {
		page: buildPage([buildTransaction('t1'), buildTransaction('t2'), buildTransaction('t3')]),
	});

	const { result } = renderHook(() => useDeleteTransactions(), { wrapper: buildWrapper(client) });

	return { client, result };
};

const listedIds = (client: QueryClient): string[] => (
	client.getQueryData<PagedResponse<Transaction>>(LIST_KEY)?.page.items.map((item) => item.id) ?? []
);

describe('useDeleteTransactions', () => {
	beforeEach(() => { vi.clearAllMocks(); });

	test('takes every selected row out of the list immediately', async () => {
		deleteTransaction.mockImplementation(() => new Promise(() => undefined));
		const { client, result } = renderDelete();

		act(() => { result.current.deleteTransactions(['t1', 't3']); });

		await waitFor(() => { expect(listedIds(client)).toEqual(['t2']); });
	});

	test('deletes each selected transaction once', async () => {
		deleteTransaction.mockResolvedValue(buildTransaction('t1'));
		const { result } = renderDelete();

		act(() => { result.current.deleteTransactions(['t1', 't2']); });

		await waitFor(() => { expect(deleteTransaction).toHaveBeenCalledTimes(2); });
	});

	test('runs the callback once the whole batch lands', async () => {
		deleteTransaction.mockResolvedValue(buildTransaction('t1'));
		const onDeleted = vi.fn();
		const { result } = renderDelete();

		act(() => { result.current.deleteTransactions(['t1', 't2'], onDeleted); });

		await waitFor(() => { expect(onDeleted).toHaveBeenCalledTimes(1); });
	});

	test('puts the rows back when a delete fails', async () => {
		deleteTransaction.mockRejectedValue(new Error('nope'));
		const { client, result } = renderDelete();

		act(() => { result.current.deleteTransactions(['t1']); });

		await waitFor(() => { expect(result.current.mutation.isError).toBe(true); });
		expect(listedIds(client)).toEqual(['t1', 't2', 't3']);
	});

	test('reports how many of the batch failed', async () => {
		deleteTransaction
			.mockResolvedValueOnce(buildTransaction('t1'))
			.mockRejectedValueOnce(new Error('nope'));
		const { result } = renderDelete();

		act(() => { result.current.deleteTransactions(['t1', 't2']); });

		await waitFor(() => { expect(result.current.mutation.isError).toBe(true); });
		expect(result.current.mutation.error?.message).toBe('Could not delete 1 of 2 transactions');
	});

	test('does nothing at all when the selection is empty', () => {
		deleteTransaction.mockResolvedValue(buildTransaction('t1'));
		const { result } = renderDelete();

		act(() => { result.current.deleteTransactions([]); });

		expect(deleteTransaction).not.toHaveBeenCalled();
	});
});
