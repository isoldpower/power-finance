import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useOptimisticCache } from './use-optimistic-cache.ts';

import type { FC, ReactNode } from 'react';
import type { Page } from '@shared/api';
import type { CachesSnapshot, OptimisticResource, PagedResponse } from './types.ts';


interface Ticket {
	id: string;
	title: string;
	open: boolean;
}

interface TicketDetail {
	ticket: Ticket;
	notes: string[];
}

const OPEN_KEY = ['tickets', true, 'default', 'first'];
const CLOSED_KEY = ['tickets', false, 'default', 'first'];
const ANY_SECOND_KEY = ['tickets', 'any', 'default', 'cursor-2'];
const DETAIL_KEY = ['ticket', 't1'];
const COUNT_KEY = ['ticket-count'];

const RESOURCE: OptimisticResource<Ticket, Ticket, TicketDetail> = {
	paged: [
		{
			key: 'tickets',
			accepts: (key, ticket) => {
				const [, open] = key;

				return typeof open !== 'boolean' || open === ticket.open;
			},
		},
	],
	details: [
		{
			key: 'ticket',
			read: (response) => response.ticket,
			write: (response, ticket) => ({ ...response, ticket }),
		},
	],
	singles: ['ticket-count'],
};

const buildTicket = (overrides: Partial<Ticket> = {}): Ticket => ({
	id: 't1',
	title: 'Broken export',
	open: true,
	...overrides,
});

const buildPage = (items: Ticket[]): Page<Ticket> => ({
	items,
	limit: 25,
	total: items.length,
	nextCursor: null,
	prevCursor: null,
});

const seed = (client: QueryClient): void => {
	client.setQueryData(OPEN_KEY, { page: buildPage([buildTicket()]) });
	client.setQueryData(CLOSED_KEY, { page: buildPage([]) });
	client.setQueryData(ANY_SECOND_KEY, { page: buildPage([buildTicket({ id: 't9' })]) });
	client.setQueryData(DETAIL_KEY, { ticket: buildTicket(), notes: ['first note'] });
	client.setQueryData(COUNT_KEY, { open: 1 });
};

const pageOf = (client: QueryClient, key: unknown[]): Page<Ticket> => {
	const response = client.getQueryData<PagedResponse<Ticket>>(key);
	if (!response) throw new Error(`No cache entry for ${JSON.stringify(key)}`);

	return response.page;
};

const buildWrapper = (client: QueryClient): FC<{ children: ReactNode }> => {
	const Wrapper: FC<{ children: ReactNode }> = ({ children }) => (
		<QueryClientProvider client={client}>{children}</QueryClientProvider>
	);

	return Wrapper;
};

const renderCache = () => {
	const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	seed(client);

	const { result } = renderHook(() => useOptimisticCache(RESOURCE), { wrapper: buildWrapper(client) });

	return { client, result };
};

describe('useOptimisticCache', () => {
	test('patches an item across every paged family that holds it', () => {
		const { client, result } = renderCache();

		act(() => {
			result.current.patchPaged('t1', (ticket) => ({ ...ticket, title: 'Broken CSV export' }));
		});

		expect(pageOf(client, OPEN_KEY).items[0]?.title).toBe('Broken CSV export');
	});

	test('moves an item out of a page whose filter it stopped matching', () => {
		const { client, result } = renderCache();

		act(() => {
			result.current.patchPaged('t1', (ticket) => ({ ...ticket, open: false }));
		});

		expect(pageOf(client, OPEN_KEY).items).toEqual([]);
		expect(pageOf(client, OPEN_KEY).total).toBe(0);
	});

	test('writes the item back into its detail response without losing siblings', () => {
		const { client, result } = renderCache();

		act(() => {
			result.current.patchDetails('t1', (ticket) => ({ ...ticket, title: 'Renamed' }));
		});

		const detail = client.getQueryData<TicketDetail>(DETAIL_KEY);
		expect(detail?.ticket.title).toBe('Renamed');
		expect(detail?.notes).toEqual(['first note']);
	});

	test('inserts only into first pages that accept the item', () => {
		const { client, result } = renderCache();

		act(() => {
			result.current.insertPaged([buildTicket({ id: 't2', title: 'Second' })]);
		});

		expect(pageOf(client, OPEN_KEY).items.map((item) => item.id)).toEqual(['t2', 't1']);
		expect(pageOf(client, CLOSED_KEY).items).toEqual([]);
		expect(pageOf(client, ANY_SECOND_KEY).items.map((item) => item.id)).toEqual(['t9']);
	});

	test('keeps insertion order when several items arrive together', () => {
		const { client, result } = renderCache();

		act(() => {
			result.current.insertPaged([
				buildTicket({ id: 'a' }),
				buildTicket({ id: 'b' }),
				buildTicket({ id: 'c' }),
			]);
		});

		expect(pageOf(client, OPEN_KEY).items.map((item) => item.id)).toEqual(['a', 'b', 'c', 't1']);
	});

	test('removes items and never drives a total below zero', () => {
		const { client, result } = renderCache();

		act(() => {
			result.current.removePaged(['t1', 'missing']);
		});

		expect(pageOf(client, OPEN_KEY).items).toEqual([]);
		expect(pageOf(client, OPEN_KEY).total).toBe(0);
	});

	test('patches a standalone cache entry through patchSingle', () => {
		const { client, result } = renderCache();

		act(() => {
			result.current.patchSingle<{ open: number }>('ticket-count', (counts) => ({
				open: counts.open - 1,
			}));
		});

		expect(client.getQueryData(COUNT_KEY)).toEqual({ open: 0 });
	});

	test('marks patched and inserted items as pending', () => {
		const { client, result } = renderCache();

		act(() => {
			result.current.patchPaged('t1', (ticket) => ({ ...ticket, title: 'Renamed' }));
			result.current.patchDetails('t1', (ticket) => ({ ...ticket, title: 'Renamed' }));
			result.current.insertPaged([buildTicket({ id: 't2' })]);
		});

		const items = pageOf(client, OPEN_KEY).items;
		expect(items.find((item) => item.id === 't1')).toMatchObject({ pending: true });
		expect(items.find((item) => item.id === 't2')).toMatchObject({ pending: true });
		expect(client.getQueryData<TicketDetail>(DETAIL_KEY)?.ticket).toMatchObject({ pending: true });
	});

	test('drops the pending flag once the server answer settles the item', () => {
		const { client, result } = renderCache();

		act(() => {
			result.current.patchPaged('t1', (ticket) => ({ ...ticket, title: 'Renamed' }));
			result.current.patchDetails('t1', (ticket) => ({ ...ticket, title: 'Renamed' }));
		});

		act(() => {
			result.current.settlePaged('t1', buildTicket({ title: 'Renamed' }));
			result.current.settleDetails('t1', (ticket) => ({ ...ticket, title: 'Renamed' }));
		});

		expect(pageOf(client, OPEN_KEY).items[0]).not.toHaveProperty('pending');
		expect(client.getQueryData<TicketDetail>(DETAIL_KEY)?.ticket).not.toHaveProperty('pending');
	});

	test('inserts settled items without a pending flag', () => {
		const { client, result } = renderCache();

		act(() => {
			result.current.settleInserted([buildTicket({ id: 't2' })]);
		});

		expect(pageOf(client, OPEN_KEY).items[0]).not.toHaveProperty('pending');
	});

	test('restores paged, detail and single caches from one snapshot', async () => {
		const { client, result } = renderCache();

		let snapshot: CachesSnapshot<Ticket, TicketDetail> | undefined;
		await act(async () => {
			snapshot = await result.current.capture();
			result.current.patchPaged('t1', (ticket) => ({ ...ticket, open: false }));
			result.current.patchDetails('t1', (ticket) => ({ ...ticket, title: 'Renamed' }));
			result.current.patchSingle<{ open: number }>('ticket-count', () => ({ open: 99 }));
		});

		act(() => {
			result.current.restore(snapshot);
		});

		expect(pageOf(client, OPEN_KEY).items.map((item) => item.id)).toEqual(['t1']);
		expect(pageOf(client, OPEN_KEY).items[0]).not.toHaveProperty('pending');
		expect(client.getQueryData<TicketDetail>(DETAIL_KEY)?.ticket.title).toBe('Broken export');
		expect(client.getQueryData(COUNT_KEY)).toEqual({ open: 1 });
	});
});
