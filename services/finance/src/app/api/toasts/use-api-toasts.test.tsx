import { beforeEach, describe, expect, test, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query';

import { ApiError } from '@shared/api';
import { MAX_STALE_REFETCHES } from '../stale-refetch.ts';
import { useApiToasts } from './use-api-toasts.ts';

import type { FC, ReactNode } from 'react';


const notify = vi.hoisted(() => ({
	pending: vi.fn(),
	success: vi.fn(),
	error: vi.fn(),
	warning: vi.fn(),
	info: vi.fn(),
	dismiss: vi.fn(),
}));

vi.mock('@shared/overlays', () => ({ notify }));

const idLike = (prefix: string): unknown => expect.stringContaining(prefix) as unknown;

const createClient = (): QueryClient => new QueryClient({
	defaultOptions: {
		queries: { retry: false },
		mutations: { retry: false },
	},
});

const buildWrapper = (client: QueryClient): FC<{ children: ReactNode }> => {
	const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
		<QueryClientProvider client={client}>{children}</QueryClientProvider>
	);

	return Wrapper;
};

describe('useApiToasts', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('stays silent for a query that succeeds', async () => {
		const client = createClient();
		const wrapper = buildWrapper(client);

		const { result } = renderHook(() => {
			useApiToasts();

			return useQuery({
				queryKey: ['transactions'],
				queryFn: () => Promise.resolve('page'),
			});
		}, { wrapper });

		await waitFor(() => {
			expect(result.current.isSuccess).toBe(true);
		});

		expect(notify.pending).not.toHaveBeenCalled();
		expect(notify.success).not.toHaveBeenCalled();
		expect(notify.error).not.toHaveBeenCalled();
	});

	test('toasts a query only when it fails', async () => {
		const client = createClient();
		const wrapper = buildWrapper(client);

		renderHook(() => {
			useApiToasts();

			return useQuery({
				queryKey: ['wallets'],
				queryFn: () => Promise.reject(new ApiError('service_unavailable', 'Wallets are offline')),
			});
		}, { wrapper });

		await waitFor(() => {
			expect(notify.error).toHaveBeenCalledTimes(1);
		});

		expect(notify.pending).not.toHaveBeenCalled();
		expect(notify.error).toHaveBeenCalledWith(
			"Couldn't load wallets",
			expect.objectContaining({ id: idLike('query:'), description: 'Wallets are offline' }),
		);
	});

	test('stays silent while a stale projection can still catch up', async () => {
		const client = createClient();
		const wrapper = buildWrapper(client);
		const stale = new ApiError('internal_error', 'Read model has not caught up', { status: 507 });

		const { result } = renderHook(() => {
			useApiToasts();

			return useQuery({
				queryKey: ['wallet', 'w1'],
				queryFn: () => Promise.reject(stale),
			});
		}, { wrapper });

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});

		expect(notify.error).not.toHaveBeenCalled();
	});

	test('toasts a stale projection once its recovery budget runs out', async () => {
		const client = createClient();
		const wrapper = buildWrapper(client);
		const stale = new ApiError('internal_error', 'Read model has not caught up', { status: 507 });

		const { result } = renderHook(() => {
			useApiToasts();

			return useQuery({
				queryKey: ['wallet', 'w1'],
				queryFn: () => Promise.reject(stale),
			});
		}, { wrapper });

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});

		for (let attempt = 1; attempt < MAX_STALE_REFETCHES; attempt += 1) {
			expect(notify.error).not.toHaveBeenCalled();

			await act(async () => {
				await client.refetchQueries({ queryKey: ['wallet', 'w1'] });
			});
		}

		expect(notify.error).toHaveBeenCalledTimes(1);
		expect(notify.error).toHaveBeenCalledWith("Couldn't load wallet", expect.anything());
	});

	test('reuses one toast id so a mutation settles into its pending toast', async () => {
		const client = createClient();
		const wrapper = buildWrapper(client);

		const { result } = renderHook(() => {
			useApiToasts();

			return useMutation({
				mutationKey: ['createTransaction'],
				mutationFn: () => Promise.resolve('created'),
			});
		}, { wrapper });

		result.current.mutate();

		await waitFor(() => {
			expect(notify.success).toHaveBeenCalledTimes(1);
		});

		const pendingId = (notify.pending.mock.calls[0][1] as { id: string }).id;
		const successId = (notify.success.mock.calls[0][1] as { id: string }).id;

		expect(notify.pending).toHaveBeenCalledWith('Creating transaction…', expect.anything());
		expect(notify.success).toHaveBeenCalledWith('Transaction created', expect.anything());
		expect(successId).toBe(pendingId);
	});

	test('toasts a mutation from pending through to its failure, describing the error', async () => {
		const client = createClient();
		const wrapper = buildWrapper(client);
		const failure = new ApiError('wallet_not_empty', 'Wallet still holds funds');

		const { result } = renderHook(() => {
			useApiToasts();

			return useMutation({
				mutationKey: ['deleteWallet'],
				mutationFn: () => Promise.reject(failure),
			});
		}, { wrapper });

		result.current.mutate();

		await waitFor(() => {
			expect(notify.error).toHaveBeenCalledTimes(1);
		});

		expect(notify.pending).toHaveBeenCalledWith(
			'Deleting wallet…',
			expect.objectContaining({ id: idLike('mutation:') }),
		);
		expect(notify.error).toHaveBeenCalledWith(
			"Couldn't delete wallet",
			expect.objectContaining({ description: 'Wallet still holds funds' }),
		);
	});

	test('says nothing about a cache write that never touched the network', async () => {
		const client = createClient();
		const wrapper = buildWrapper(client);

		renderHook(() => {
			useApiToasts();
		}, { wrapper });

		client.setQueryData(['wallets'], 'seeded');

		await waitFor(() => {
			expect(client.getQueryData(['wallets'])).toBe('seeded');
		});

		expect(notify.pending).not.toHaveBeenCalled();
		expect(notify.success).not.toHaveBeenCalled();
		expect(notify.error).not.toHaveBeenCalled();
	});
});
