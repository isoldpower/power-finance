import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useOptimisticGoals } from './use-optimistic-goals.ts';
import { goalFromDraft } from './draft-goal.ts';

import type { FC, ReactNode } from 'react';
import type { Page } from '@shared/api';
import type { PagedResponse } from '@shared/data';
import type { LedgerEntry } from '@entity/accounts';
import type { Goal } from '@entity/wallets';
import type { FetchGoalResponse } from '../../../goals-api';
import type { GoalCachesSnapshot } from './types.ts';


const LIST_KEY = ['goals', 'default', 'first'];
const LIST_SECOND_KEY = ['goals', 'default', 'cursor-2'];
const DETAIL_KEY = ['goal', 'g1'];

const buildGoal = (overrides: Partial<Goal> = {}): Goal => ({
	id: 'g1',
	name: 'New laptop',
	url: null,
	currency: 'USD',
	finishAt: '2026-12-01T00:00:00.000Z',
	createdAt: '2026-03-01T00:00:00.000Z',
	updatedAt: null,
	deletedAt: null,
	target: { amount: '2000.00', currency: 'USD' },
	progress: { amount: '250.00', currency: 'USD' },
	...overrides,
});

const buildPage = (items: Goal[]): Page<Goal> => ({
	items,
	limit: 25,
	total: items.length,
	nextCursor: null,
	prevCursor: null,
});

const buildDetails = (goal: Goal): FetchGoalResponse => ({
	goal,
	history: { items: [] as LedgerEntry[], limit: 10, total: 0, nextCursor: null, prevCursor: null },
});

const seed = (client: QueryClient): void => {
	client.setQueryData(LIST_KEY, { page: buildPage([buildGoal()]) });
	client.setQueryData(LIST_SECOND_KEY, { page: buildPage([buildGoal({ id: 'g9', name: 'Holiday' })]) });
	client.setQueryData(DETAIL_KEY, buildDetails(buildGoal()));
};

const pageOf = (client: QueryClient, key: unknown[]): Page<Goal> => {
	const response = client.getQueryData<PagedResponse<Goal>>(key);
	if (!response) throw new Error(`No cache entry for ${JSON.stringify(key)}`);

	return response.page;
};

const detailOf = (client: QueryClient): FetchGoalResponse => {
	const response = client.getQueryData<FetchGoalResponse>(DETAIL_KEY);
	if (!response) throw new Error('No goal detail cached');

	return response;
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

	const { result } = renderHook(() => useOptimisticGoals(), { wrapper: buildWrapper(client) });

	return { client, result };
};

describe('useOptimisticGoals', () => {
	test('patches the list and the detail together and keeps the history', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyPatch('g1', { name: 'New laptop fund' });
		});

		expect(pageOf(client, LIST_KEY).items[0]?.name).toBe('New laptop fund');
		expect(detailOf(client).goal.name).toBe('New laptop fund');
		expect(detailOf(client).history.limit).toBe(10);
	});

	test('rewrites the target in the goal currency', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyPatch('g1', { target: '2500.00' });
		});

		expect(pageOf(client, LIST_KEY).items[0]?.target).toEqual({
			amount: '2500.00',
			currency: 'USD',
		});
	});

	test('projects a draft into a goal that starts with no progress', () => {
		const goal = goalFromDraft(
			{ name: 'Camera', finishAt: '2027-01-01T00:00:00.000Z', currency: 'EUR', target: '900.00' },
			'temp',
			'2026-09-08T10:00:00.000Z',
		);

		expect(goal.progress).toEqual({ amount: '0', currency: 'EUR' });
		expect(goal.target).toEqual({ amount: '900.00', currency: 'EUR' });
		expect(goal.deletedAt).toBeNull();
	});

	test('prepends a created goal to the first page only', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyCreate(buildGoal({ id: 'temp', name: 'Camera' }));
		});

		expect(pageOf(client, LIST_KEY).items.map((item) => item.id)).toEqual(['temp', 'g1']);
		expect(pageOf(client, LIST_SECOND_KEY).items.map((item) => item.id)).toEqual(['g9']);
	});

	test('removes a closed goal and marks its detail closed', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyRemove('g1', '2026-09-08T10:00:00.000Z');
		});

		expect(pageOf(client, LIST_KEY).items).toEqual([]);
		expect(detailOf(client).goal.deletedAt).toBe('2026-09-08T10:00:00.000Z');
	});

	test('restores both caches when the request fails', async () => {
		const { client, result } = renderOptimistic();

		let snapshot: GoalCachesSnapshot | undefined;
		await act(async () => {
			snapshot = await result.current.capture();
			result.current.applyRemove('g1', '2026-09-08T10:00:00.000Z');
		});

		act(() => {
			result.current.restore(snapshot);
		});

		expect(pageOf(client, LIST_KEY).items.map((item) => item.id)).toEqual(['g1']);
		expect(detailOf(client).goal.deletedAt).toBeNull();
	});
});
