import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useOptimisticWallets } from './use-optimistic-wallets.ts';

import type { FC, ReactNode } from 'react';
import type { Page } from '@shared/api';
import type { Transaction } from '@entity/transactions';
import type { Wallet, WalletDetails } from '@entity/wallets';
import type { FetchWalletResponse } from '../../../wallets-api';
import type { WalletCachesSnapshot, WalletPageResponse } from './types.ts';


const LIST_KEY = ['wallets', 'default', 'first'];
const LIST_SECOND_KEY = ['wallets', 'default', 'cursor-2'];
const MATCHING_SEARCH_KEY = ['searchWallet', { name: 'ever' }, 'default', 'first'];
const OTHER_SEARCH_KEY = ['searchWallet', { name: 'savings' }, 'default', 'first'];
const DETAIL_KEY = ['wallet', 'w1'];

const buildWallet = (overrides: Partial<Wallet> = {}): Wallet => ({
	id: 'w1',
	name: 'Everyday',
	createdAt: '2026-03-01T00:00:00.000Z',
	updatedAt: null,
	deletedAt: null,
	category: 'checking',
	currency: 'USD',
	balance: { amount: '120.00', currency: 'USD' },
	zeroBalance: { amount: '0.00', currency: 'USD' },
	favorite: false,
	color: '#112233',
	...overrides,
});

const buildPage = (items: Wallet[]): Page<Wallet> => ({
	items,
	limit: 25,
	total: items.length,
	nextCursor: null,
	prevCursor: null,
});

const buildDetails = (wallet: Wallet): FetchWalletResponse => ({
	wallet: {
		...wallet,
		period: {
			inflow: { amount: '0.00', currency: wallet.currency },
			outflow: { amount: '0.00', currency: wallet.currency },
		},
	} satisfies WalletDetails,
	recent: { items: [] as Transaction[], limit: 3, total: 0, nextCursor: null, prevCursor: null },
	period: 'last_month',
});

const seed = (client: QueryClient): void => {
	client.setQueryData(LIST_KEY, { page: buildPage([buildWallet()]) });
	client.setQueryData(LIST_SECOND_KEY, { page: buildPage([buildWallet({ id: 'w9', name: 'Vault' })]) });
	client.setQueryData(MATCHING_SEARCH_KEY, { page: buildPage([buildWallet()]) });
	client.setQueryData(OTHER_SEARCH_KEY, { page: buildPage([]) });
	client.setQueryData(DETAIL_KEY, buildDetails(buildWallet()));
};

const pageOf = (client: QueryClient, key: unknown[]): Page<Wallet> => {
	const response = client.getQueryData<WalletPageResponse>(key);
	if (!response) throw new Error(`No cache entry for ${JSON.stringify(key)}`);

	return response.page;
};

const detailOf = (client: QueryClient): WalletDetails => {
	const response = client.getQueryData<FetchWalletResponse>(DETAIL_KEY);
	if (!response) throw new Error('No wallet detail cached');

	return response.wallet;
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

	const { result } = renderHook(() => useOptimisticWallets(), { wrapper: buildWrapper(client) });

	return { client, result };
};

describe('useOptimisticWallets', () => {
	test('applies a patch to the list, the search results and the detail cache at once', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyPatch('w1', { name: 'Everyday plus', favorite: true });
		});

		expect(pageOf(client, LIST_KEY).items[0]?.name).toBe('Everyday plus');
		expect(pageOf(client, MATCHING_SEARCH_KEY).items[0]?.favorite).toBe(true);
		expect(detailOf(client).name).toBe('Everyday plus');
		expect(detailOf(client).period?.inflow.amount).toBe('0.00');
	});

	test('rewrites zeroBalance in the wallet currency', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyPatch('w1', { zeroBalance: '25.00' });
		});

		expect(pageOf(client, LIST_KEY).items[0]?.zeroBalance).toEqual({ amount: '25.00', currency: 'USD' });
	});

	test('restores every touched cache when the mutation fails', async () => {
		const { client, result } = renderOptimistic();

		let snapshot: WalletCachesSnapshot | undefined;
		await act(async () => {
			snapshot = await result.current.capture();
			result.current.applyPatch('w1', { name: 'Everyday plus' });
		});

		act(() => {
			result.current.restore(snapshot);
		});

		expect(pageOf(client, LIST_KEY).items[0]?.name).toBe('Everyday');
		expect(pageOf(client, MATCHING_SEARCH_KEY).items[0]?.name).toBe('Everyday');
		expect(detailOf(client).name).toBe('Everyday');
	});

	test('prepends a created wallet only to first pages that accept it', () => {
		const { client, result } = renderOptimistic();
		const created = buildWallet({ id: 'temp', name: 'Everyday backup' });

		act(() => {
			result.current.applyCreate(created);
		});

		expect(pageOf(client, LIST_KEY).items.map((item) => item.id)).toEqual(['temp', 'w1']);
		expect(pageOf(client, LIST_KEY).total).toBe(2);
		expect(pageOf(client, LIST_SECOND_KEY).items.map((item) => item.id)).toEqual(['w9']);
		expect(pageOf(client, MATCHING_SEARCH_KEY).items.map((item) => item.id)).toEqual(['temp', 'w1']);
		expect(pageOf(client, OTHER_SEARCH_KEY).items).toEqual([]);
	});

	test('swaps the temporary wallet for the one the server returned', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyCreate(buildWallet({ id: 'temp', name: 'Everyday backup' }));
			result.current.applySettled('temp', buildWallet({ id: 'w2', name: 'Everyday backup' }));
		});

		expect(pageOf(client, LIST_KEY).items.map((item) => item.id)).toEqual(['w2', 'w1']);
		expect(pageOf(client, LIST_KEY).total).toBe(2);
	});

	test('drops a settled wallet from searches it no longer matches', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applySettled('w1', buildWallet({ name: 'Rainy day' }));
		});

		expect(pageOf(client, LIST_KEY).items[0]?.name).toBe('Rainy day');
		expect(pageOf(client, MATCHING_SEARCH_KEY).items).toEqual([]);
		expect(pageOf(client, MATCHING_SEARCH_KEY).total).toBe(0);
	});

	test('removes a closed wallet from the pages and marks the detail closed', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyRemove('w1', '2026-09-08T10:00:00.000Z');
		});

		expect(pageOf(client, LIST_KEY).items).toEqual([]);
		expect(pageOf(client, LIST_KEY).total).toBe(0);
		expect(pageOf(client, MATCHING_SEARCH_KEY).items).toEqual([]);
		expect(detailOf(client).deletedAt).toBe('2026-09-08T10:00:00.000Z');
	});
});
