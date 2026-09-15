import { beforeEach, describe, expect, test, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MAX_DISPATCH_POLLS } from './config.ts';
import { useTransactionLedger } from './use-transaction-ledger.ts';

import type { FC, ReactNode } from 'react';
import type { TransactionPosting } from '@entity/transactions';


const LEDGER_KEY = ['transactionLedger', 't1'];

const fetchTransaction = vi.hoisted(() => vi.fn());

vi.mock('../transactions-api', () => ({ fetchTransaction }));
vi.mock('@app/api', async (importOriginal) => ({
	...await importOriginal<Record<string, unknown>>(),
	useApiContext: () => ({ transactionServers: { rest: {} } }),
}));

const buildPosting = (id: string): TransactionPosting => ({
	id,
	accountId: `${id}-account`,
	title: 'Groceries',
	icon: 'cart',
	debit: true,
	position: 0,
	money: { amount: '10.00', currency: 'USD' },
});

const buildWrapper = (client: QueryClient): FC<{ children: ReactNode }> => {
	const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
		<QueryClientProvider client={client}>{children}</QueryClientProvider>
	);

	return Wrapper;
};

const renderLedger = () => {
	const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	const { result } = renderHook(() => useTransactionLedger('t1'), { wrapper: buildWrapper(client) });

	return { client, result };
};

describe('useTransactionLedger', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('reports a ledger that already carries postings as ready', async () => {
		fetchTransaction.mockResolvedValue({ postings: [buildPosting('p1')] });
		const { result } = renderLedger();

		await waitFor(() => {
			expect(result.current.ledgerState).toBe('ready');
		});

		expect(result.current.entries).toHaveLength(1);
	});

	test('waits on a ledger whose postings have not been derived yet', async () => {
		fetchTransaction.mockResolvedValue({ postings: [] });
		const { result } = renderLedger();

		await waitFor(() => {
			expect(result.current.ledgerState).toBe('dispatching');
		});
	});

	test('gives up instead of polling an empty ledger forever', async () => {
		fetchTransaction.mockResolvedValue({ postings: [] });
		const { client, result } = renderLedger();

		await waitFor(() => {
			expect(result.current.ledgerState).toBe('dispatching');
		});

		for (let poll = 1; poll < MAX_DISPATCH_POLLS; poll += 1) {
			await act(async () => {
				await client.refetchQueries({ queryKey: LEDGER_KEY });
			});
		}

		await waitFor(() => {
			expect(result.current.ledgerState).toBe('unavailable');
		});
	});
});
