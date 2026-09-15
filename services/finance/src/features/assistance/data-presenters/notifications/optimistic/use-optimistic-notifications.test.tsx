import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useOptimisticNotifications } from './use-optimistic-notifications.ts';

import type { FC, ReactNode } from 'react';
import type { Page } from '@shared/api';
import type { PagedResponse } from '@shared/data';
import type { Notification, NotificationCounts } from '@entity/assistance';
import type { NotificationCachesSnapshot } from './types.ts';


const UNREAD_KEY = ['notifications', false, 'any', 'default', 'first'];
const READ_KEY = ['notifications', true, 'any', 'default', 'first'];
const CRITICAL_KEY = ['notifications', 'any', 'critical', 'default', 'first'];
const ANY_KEY = ['notifications', 'any', 'any', 'default', 'first'];
const COUNT_KEY = ['notifications-count'];

const buildNotification = (overrides: Partial<Notification> = {}): Notification => ({
	id: 'n1',
	createdAt: '2026-03-01T00:00:00.000Z',
	updatedAt: null,
	deletedAt: null,
	severity: 'warning',
	title: 'Budget nearly spent',
	body: 'You have used 90% of this month budget.',
	subject: null,
	acknowledgedAt: null,
	...overrides,
});

const buildPage = (items: Notification[]): Page<Notification> => ({
	items,
	limit: 25,
	total: items.length,
	nextCursor: null,
	prevCursor: null,
});

const seed = (client: QueryClient): void => {
	client.setQueryData(UNREAD_KEY, { page: buildPage([buildNotification()]) });
	client.setQueryData(READ_KEY, { page: buildPage([]) });
	client.setQueryData(CRITICAL_KEY, { page: buildPage([]) });
	client.setQueryData(ANY_KEY, { page: buildPage([buildNotification()]) });
	client.setQueryData(COUNT_KEY, { unacknowledged: 1, total: 4 });
};

const pageOf = (client: QueryClient, key: unknown[]): Page<Notification> => {
	const response = client.getQueryData<PagedResponse<Notification>>(key);
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

	const { result } = renderHook(() => useOptimisticNotifications(), {
		wrapper: buildWrapper(client),
	});

	return { client, result };
};

describe('useOptimisticNotifications', () => {
	test('drops an acknowledged notification from the unread list only', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyAcknowledge('n1', '2026-09-08T10:00:00.000Z');
		});

		expect(pageOf(client, UNREAD_KEY).items).toEqual([]);
		expect(pageOf(client, UNREAD_KEY).total).toBe(0);
		expect(pageOf(client, ANY_KEY).items[0]?.acknowledgedAt).toBe('2026-09-08T10:00:00.000Z');
	});

	test('decrements the unread badge without touching the total', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyAcknowledge('n1', '2026-09-08T10:00:00.000Z');
		});

		expect(client.getQueryData<NotificationCounts>(COUNT_KEY)).toEqual({
			unacknowledged: 0,
			total: 4,
		});
	});

	test('never drives the unread badge below zero', () => {
		const { client, result } = renderOptimistic();
		client.setQueryData(COUNT_KEY, { unacknowledged: 0, total: 4 });

		act(() => {
			result.current.applyAcknowledge('n1', '2026-09-08T10:00:00.000Z');
		});

		expect(client.getQueryData<NotificationCounts>(COUNT_KEY)?.unacknowledged).toBe(0);
	});

	test('restores the lists and the badge when the request fails', async () => {
		const { client, result } = renderOptimistic();

		let snapshot: NotificationCachesSnapshot | undefined;
		await act(async () => {
			snapshot = await result.current.capture();
			result.current.applyAcknowledge('n1', '2026-09-08T10:00:00.000Z');
		});

		act(() => {
			result.current.restore(snapshot);
		});

		expect(pageOf(client, UNREAD_KEY).items.map((item) => item.id)).toEqual(['n1']);
		expect(client.getQueryData<NotificationCounts>(COUNT_KEY)?.unacknowledged).toBe(1);
	});
});
