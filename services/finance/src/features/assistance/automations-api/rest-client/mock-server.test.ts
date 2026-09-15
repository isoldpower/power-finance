import { describe, test, expect, beforeEach, vi } from 'vitest';

import { isApiError } from '@shared/api';
import { AutomationsMockRESTApiClient } from './mock-server.ts';

import type { AutomationCreateBody, AutomationSearchField } from '../types.ts';


let client: AutomationsMockRESTApiClient;

const draft = (
	name: string,
	overrides: Partial<AutomationCreateBody> = {},
): AutomationCreateBody => ({
	name,
	icon: 'basket',
	enabled: true,
	trigger: { type: 'event', event: 'transaction.created' },
	effects: [{ type: 'set_category', params: { category: 'Groceries' } }],
	...overrides,
});

const scheduled = (name: string): AutomationCreateBody => draft(name, {
	trigger: { type: 'schedule', schedule: 'weekly' },
	effects: [{ type: 'notify', params: { severity: 'info', title: 'Weekly digest' } }],
});

const namesOf = (rules: { name: string }[]): string[] => (
	rules.map((rule) => rule.name).filter((name) => name.startsWith('Zz '))
);

beforeEach(() => {
	const store = new Map<string, string>();

	vi.stubGlobal('localStorage', {
		getItem: (key: string) => store.get(key) ?? null,
		setItem: (key: string, value: string) => { store.set(key, value); },
		removeItem: (key: string) => { store.delete(key); },
		clear: () => { store.clear(); },
	});

	client = new AutomationsMockRESTApiClient('automations-test');
});

describe('AutomationsMockRESTApiClient search', () => {
	test('narrows by a case insensitive name fragment', async () => {
		await client.post({ data: draft('Zz tag groceries') });
		await client.post({ data: draft('Zz weekly digest') });

		const response = await client.search({
			data: { filter_body: { field_name: 'name', operator: 'icontains', value: 'Zz TAG' } },
		});

		expect(namesOf(response.data)).toEqual(['Zz tag groceries']);
	});

	test('filters on the enabled flag as a string leaf', async () => {
		await client.post({ data: draft('Zz active rule') });
		await client.post({ data: draft('Zz paused rule', { enabled: false }) });

		const response = await client.search({
			data: { filter_body: { field_name: 'enabled', operator: 'eq', value: 'false' } },
		});

		expect(namesOf(response.data)).toEqual(['Zz paused rule']);
	});

	test('reaches into the trigger for type, event and schedule', async () => {
		await client.post({ data: draft('Zz on new transaction') });
		await client.post({ data: scheduled('Zz every week') });

		const byType = await client.search({
			data: { filter_body: { field_name: 'trigger_type', operator: 'in', value: ['schedule'] } },
		});
		const byEvent = await client.search({
			data: {
				filter_body: {
					field_name: 'event',
					operator: 'eq',
					value: 'transaction.created',
				},
			},
		});

		expect(namesOf(byType.data)).toEqual(['Zz every week']);
		expect(namesOf(byEvent.data)).toEqual(['Zz on new transaction']);
	});

	test('never matches a rule whose trigger leaves the field null', async () => {
		const created = await client.post({ data: scheduled('Zz every week') });

		const response = await client.search({
			data: { filter_body: { field_name: 'event', operator: 'in', value: ['transaction.created'] } },
		});

		expect(response.data.map((rule) => rule.id)).not.toContain(created.data.id);
	});

	test('leaves a deleted rule out of the results', async () => {
		const created = await client.post({ data: draft('Zz retired rule') });
		await client.delete({ id: created.data.id });

		const response = await client.search({
			data: { filter_body: { field_name: 'name', operator: 'icontains', value: 'Zz retired' } },
		});

		expect(response.data).toEqual([]);
	});

	test('rejects a field the search policy does not allow', async () => {
		await client.post({ data: draft('Zz tag groceries') });

		try {
			await client.search({
				data: {
					filter_body: {
						field_name: 'runs' as AutomationSearchField,
						operator: 'eq',
						value: '0',
					},
				},
			});
			expect.unreachable('search should reject an unknown field');
		} catch (error: unknown) {
			expect(isApiError(error)).toBe(true);
		}
	});

	test('pages with opaque cursors bound to the filter', async () => {
		await client.post({ data: draft('Zz alpha') });
		await client.post({ data: draft('Zz beta') });
		await client.post({ data: draft('Zz gamma') });

		const body = {
			filter_body: { field_name: 'name', operator: 'icontains', value: 'Zz ' },
		} as const;
		const first = await client.search({ data: body, params: { limit: 2 } });

		expect(first.data).toHaveLength(2);
		expect(first.meta.total).toBe(3);
		expect(first.meta.next_cursor).not.toBeNull();

		const second = await client.search({
			data: body,
			params: { limit: 2, cursor: first.meta.next_cursor ?? undefined },
		});

		expect(second.data).toHaveLength(1);
	});
});
