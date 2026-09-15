import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useOptimisticAutomations } from './use-optimistic-automations.ts';

import type { FC, ReactNode } from 'react';
import type { Page } from '@shared/api';
import type { PagedResponse } from '@shared/data';
import type { Automation } from '@entity/assistance';
import type { AutomationCachesSnapshot } from './types.ts';


const ENABLED_KEY = ['automations', true, 'default', 'first'];
const DISABLED_KEY = ['automations', false, 'default', 'first'];
const ANY_KEY = ['automations', 'any', 'default', 'first'];
const DETAIL_KEY = ['automation', 'r1'];

const buildAutomation = (overrides: Partial<Automation> = {}): Automation => ({
	id: 'r1',
	createdAt: '2026-03-01T00:00:00.000Z',
	updatedAt: null,
	deletedAt: null,
	name: 'Tag groceries',
	icon: 'basket',
	enabled: true,
	trigger: { type: 'event', event: 'transaction.created', schedule: null, condition: null },
	effects: [{ type: 'set_category', category: 'Groceries' }],
	lastRunAt: null,
	runs: 0,
	...overrides,
});

const buildPage = (items: Automation[]): Page<Automation> => ({
	items,
	limit: 25,
	total: items.length,
	nextCursor: null,
	prevCursor: null,
});

const seed = (client: QueryClient): void => {
	client.setQueryData(ENABLED_KEY, { page: buildPage([buildAutomation()]) });
	client.setQueryData(DISABLED_KEY, { page: buildPage([]) });
	client.setQueryData(ANY_KEY, { page: buildPage([buildAutomation()]) });
	client.setQueryData(DETAIL_KEY, buildAutomation());
};

const pageOf = (client: QueryClient, key: unknown[]): Page<Automation> => {
	const response = client.getQueryData<PagedResponse<Automation>>(key);
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

	const { result } = renderHook(() => useOptimisticAutomations(), {
		wrapper: buildWrapper(client),
	});

	return { client, result };
};

describe('useOptimisticAutomations', () => {
	test('flips the toggle in the detail cache and the unfiltered list', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyPatch('r1', { enabled: false });
		});

		expect(client.getQueryData<Automation>(DETAIL_KEY)?.enabled).toBe(false);
		expect(pageOf(client, ANY_KEY).items[0]?.enabled).toBe(false);
	});

	test('drops a disabled rule out of the enabled-only list', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyPatch('r1', { enabled: false });
		});

		expect(pageOf(client, ENABLED_KEY).items).toEqual([]);
	});

	test('leaves untouched fields alone', () => {
		const { client, result } = renderOptimistic();

		act(() => {
			result.current.applyPatch('r1', { name: 'Tag food' });
		});

		const [rule] = pageOf(client, ANY_KEY).items;
		expect(rule.name).toBe('Tag food');
		expect(rule.effects).toEqual([{ type: 'set_category', category: 'Groceries' }]);
	});

	test('restores the toggle when the request fails', async () => {
		const { client, result } = renderOptimistic();

		let snapshot: AutomationCachesSnapshot | undefined;
		await act(async () => {
			snapshot = await result.current.capture();
			result.current.applyPatch('r1', { enabled: false });
		});

		act(() => {
			result.current.restore(snapshot);
		});

		expect(pageOf(client, ENABLED_KEY).items.map((item) => item.id)).toEqual(['r1']);
		expect(client.getQueryData<Automation>(DETAIL_KEY)?.enabled).toBe(true);
	});
});
