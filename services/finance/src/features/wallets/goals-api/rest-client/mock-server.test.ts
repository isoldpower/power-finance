import { describe, test, expect, beforeEach, vi } from 'vitest';

import { isApiError } from '@shared/api';
import { GoalsMockRESTApiClient } from './mock-server.ts';

import type { GoalSearchField } from '../types.ts';


let client: GoalsMockRESTApiClient;

const draft = (name: string, target = '1000.00', currency = 'USD') => ({
	name,
	finish_at: '2027-01-01T00:00:00.000Z',
	currency,
	target,
});

beforeEach(() => {
	const store = new Map<string, string>();

	vi.stubGlobal('localStorage', {
		getItem: (key: string) => store.get(key) ?? null,
		setItem: (key: string, value: string) => { store.set(key, value); },
		removeItem: (key: string) => { store.delete(key); },
		clear: () => { store.clear(); },
	});

	client = new GoalsMockRESTApiClient('goals-test');
});

describe('GoalsMockRESTApiClient search', () => {
	test('narrows by a case insensitive name fragment', async () => {
		await client.post({ data: draft('New laptop') });
		await client.post({ data: draft('Winter holiday') });

		const response = await client.search({
			data: { filter_body: { field_name: 'name', operator: 'icontains', value: 'LAPTOP' } },
		});

		expect(response.data.map((goal) => goal.name)).toEqual(['New laptop']);
		expect(response.meta.total).toBe(1);
	});

	test('compares the target as a number, not as a string', async () => {
		await client.post({ data: draft('Small', '90.00') });
		await client.post({ data: draft('Large', '1000.00') });

		const response = await client.search({
			data: { filter_body: { field_name: 'target', operator: 'gte', value: '100' } },
		});

		expect(response.data.map((goal) => goal.name)).toEqual(['Large']);
	});

	test('combines leaves with and', async () => {
		await client.post({ data: draft('Camera', '800.00', 'EUR') });
		await client.post({ data: draft('Camera bag', '80.00', 'EUR') });
		await client.post({ data: draft('Camera lens', '800.00', 'USD') });

		const response = await client.search({
			data: {
				filter_body: {
					and: [
						{ field_name: 'currency', operator: 'in', value: ['EUR'] },
						{ field_name: 'target', operator: 'gte', value: '100' },
					],
				},
			},
		});

		expect(response.data.map((goal) => goal.name)).toEqual(['Camera']);
	});

	test('leaves a closed goal out of the results', async () => {
		const created = await client.post({ data: draft('Retired goal') });
		await client.delete({ id: created.data.id });

		const response = await client.search({
			data: { filter_body: { field_name: 'name', operator: 'icontains', value: 'retired' } },
		});

		expect(response.data).toEqual([]);
	});

	test('rejects a field the search policy does not allow', async () => {
		await client.post({ data: draft('Camera') });

		try {
			await client.search({
				data: {
					filter_body: {
						field_name: 'url' as GoalSearchField,
						operator: 'eq',
						value: 'https://example.com',
					},
				},
			});
			expect.unreachable('search should reject an unknown field');
		} catch (error: unknown) {
			expect(isApiError(error)).toBe(true);
		}
	});

	test('rejects an operator the field does not allow', async () => {
		await client.post({ data: draft('Camera') });

		try {
			await client.search({
				data: { filter_body: { field_name: 'currency', operator: 'gte', value: 'USD' } },
			});
			expect.unreachable('search should reject a disallowed operator');
		} catch (error: unknown) {
			expect(isApiError(error)).toBe(true);
		}
	});

	test('pages with opaque cursors bound to the filter', async () => {
		await client.post({ data: draft('Alpha') });
		await client.post({ data: draft('Beta') });
		await client.post({ data: draft('Gamma') });

		const body = { filter_body: { field_name: 'target', operator: 'gte', value: '0' } } as const;
		const first = await client.search({ data: body, params: { limit: 2 } });

		expect(first.data).toHaveLength(2);
		expect(first.meta.next_cursor).not.toBeNull();

		const second = await client.search({
			data: body,
			params: { limit: 2, cursor: first.meta.next_cursor ?? undefined },
		});

		expect(second.data).toHaveLength(1);
	});
});
