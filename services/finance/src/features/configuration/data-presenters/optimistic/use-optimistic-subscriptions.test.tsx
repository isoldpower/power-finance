import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useOptimisticSubscriptions } from './use-optimistic-subscriptions.ts';

import type { FC, ReactNode } from 'react';
import type { Page } from '@shared/api';
import type { PagedResponse } from '@shared/data';
import type { WebhookSubscription } from '@entity/configuration';


const OWN_KEY = ['webhook-subscriptions', 'wh1'];
const OTHER_KEY = ['webhook-subscriptions', 'wh2'];

const buildSubscription = (overrides: Partial<WebhookSubscription> = {}): WebhookSubscription => ({
	id: 's1',
	createdAt: '2026-03-01T00:00:00.000Z',
	webhookId: 'wh1',
	event: 'transaction.created',
	...overrides,
});

const buildPage = (items: WebhookSubscription[]): Page<WebhookSubscription> => ({
	items,
	limit: 25,
	total: items.length,
	nextCursor: null,
	prevCursor: null,
});

const seed = (client: QueryClient): void => {
	client.setQueryData(OWN_KEY, { page: buildPage([buildSubscription()]) });
	client.setQueryData(OTHER_KEY, { page: buildPage([]) });
};

const pageOf = (client: QueryClient, key: unknown[]): Page<WebhookSubscription> => {
	const response = client.getQueryData<PagedResponse<WebhookSubscription>>(key);
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

	const { result } = renderHook(() => useOptimisticSubscriptions(), {
		wrapper: buildWrapper(client),
	});

	return { client, result };
};

describe('useOptimisticSubscriptions', () => {
	test('adds a subscription to its own webhook list even though the key carries no cursor', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applySubscribe(buildSubscription({ id: 'temp', event: 'wallet.closed' }));
		});

		expect(pageOf(client, OWN_KEY).items.map((item) => item.id)).toEqual(['temp', 's1']);
		expect(pageOf(client, OWN_KEY).total).toBe(2);
	});

	test('keeps another webhook list out of it', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applySubscribe(buildSubscription({ id: 'temp', event: 'wallet.closed' }));
		});

		expect(pageOf(client, OTHER_KEY).items).toEqual([]);
	});

	test('removes an unsubscribed event straight away', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyUnsubscribe('s1');
		});

		expect(pageOf(client, OWN_KEY).items).toEqual([]);
	});

	test('swaps the temporary subscription for the stored one', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applySubscribe(buildSubscription({ id: 'temp', event: 'wallet.closed' }));
			result.current.applySettled('temp', buildSubscription({ id: 's2', event: 'wallet.closed' }));
		});

		expect(pageOf(client, OWN_KEY).items.map((item) => item.id)).toEqual(['s2', 's1']);
	});
});
