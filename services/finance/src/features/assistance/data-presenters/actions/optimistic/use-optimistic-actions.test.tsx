import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useOptimisticActions } from './use-optimistic-actions.ts';

import type { FC, ReactNode } from 'react';
import type { Page } from '@shared/api';
import type { PagedResponse } from '@shared/data';
import type { Action } from '@entity/assistance';
import type { ActionCachesSnapshot } from './types.ts';


const PENDING_KEY = ['actions', 'pending', 'any', 'any', 'default', 'first'];
const RESOLVED_KEY = ['actions', 'resolved', 'any', 'any', 'default', 'first'];
const SCHEDULER_KEY = ['actions', 'pending', 'scheduler', 'any', 'default', 'first'];

const buildAction = (overrides: Partial<Action> = {}): Action => ({
	id: 'a1',
	createdAt: '2026-03-01T00:00:00.000Z',
	updatedAt: null,
	deletedAt: null,
	source: 'assistant',
	kind: 'review_transaction',
	severity: 'warning',
	status: 'pending',
	title: 'Review a duplicate charge',
	body: 'Two identical charges landed today.',
	subject: null,
	money: null,
	groupKey: null,
	occurrences: 1,
	lastSeenAt: '2026-03-01T00:00:00.000Z',
	expiresAt: null,
	resolvedAt: null,
	resolutions: [],
	...overrides,
});

const buildPage = (items: Action[]): Page<Action> => ({
	items,
	limit: 25,
	total: items.length,
	nextCursor: null,
	prevCursor: null,
});

const seed = (client: QueryClient): void => {
	client.setQueryData(PENDING_KEY, { page: buildPage([buildAction()]) });
	client.setQueryData(RESOLVED_KEY, { page: buildPage([]) });
	client.setQueryData(SCHEDULER_KEY, { page: buildPage([]) });
};

const pageOf = (client: QueryClient, key: unknown[]): Page<Action> => {
	const response = client.getQueryData<PagedResponse<Action>>(key);
	if (!response) throw new Error(`No cache entry for ${JSON.stringify(key)}`);

	return response.page;
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

	const { result } = renderHook(() => useOptimisticActions(), { wrapper: buildWrapper(client) });

	return { client, result };
};

describe('useOptimisticActions', () => {
	test('takes a resolved action out of the pending queue immediately', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyResolve('a1', '2026-09-08T10:00:00.000Z');
		});

		expect(pageOf(client, PENDING_KEY).items).toEqual([]);
		expect(pageOf(client, PENDING_KEY).total).toBe(0);
	});

	test('leaves lists filtered by another source untouched', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyResolve('a1', '2026-09-08T10:00:00.000Z');
		});

		expect(pageOf(client, SCHEDULER_KEY).items).toEqual([]);
	});

	test('puts the action back when the request fails', async () => {
		const { client, result } = renderOptimistic();

		let snapshot: ActionCachesSnapshot | undefined;
		await act(async () => {
			snapshot = await result.current.capture();
			result.current.applyResolve('a1', '2026-09-08T10:00:00.000Z');
		});

		act(() => {
			result.current.restore(snapshot);
		});

		expect(pageOf(client, PENDING_KEY).items.map((item) => item.id)).toEqual(['a1']);
		expect(pageOf(client, PENDING_KEY).items[0]?.status).toBe('pending');
	});
});
