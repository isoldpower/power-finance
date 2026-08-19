import { describe, test, expect, beforeEach, vi } from 'vitest';

import { isApiError } from '@shared/api';
import { AutomationsMockRESTApiClient } from './mock-server.ts';
import type { AutomationCreateBody } from '../types.ts';

let client: AutomationsMockRESTApiClient;

const draft = (overrides: Partial<AutomationCreateBody> = {}): AutomationCreateBody => ({
	name: 'Auto-categorise coffee shops',
	icon: 'tag',
	trigger: {
		type: 'event',
		event: 'transaction.created',
		filter_body: { and: [{ field_name: 'name', operator: 'icontains', value: 'coffee' }] },
	},
	effects: [{ type: 'set_category', params: { category: 'Dining' } }],
	...overrides,
});

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

describe('AutomationsMockRESTApiClient', () => {
	test('creates a rule with both trigger keys present in the response', async () => {
		const { data, meta } = await client.post({ data: draft() });

		expect(meta.idempotent_replay).toBe(false);
		expect(data.enabled).toBe(true);
		expect(data.trigger.event).toBe('transaction.created');
		expect(data.trigger.schedule).toBeNull();
		expect(data.runs).toBe(0);
	});

	test('rejects a trigger carrying the other type’s field', async () => {
		await expect(client.post({
			data: draft({ trigger: { type: 'event', event: 'transaction.created', schedule: 'daily' } }),
		})).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.details[0]?.code === 'trigger_field_conflict',
		);
	});

	test('rejects a rule with no effects', async () => {
		await expect(client.post({ data: draft({ effects: [] }) })).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.details[0]?.code === 'required',
		);
	});

	test('rejects an unknown effect type', async () => {
		await expect(client.post({
			data: draft({ effects: [{ type: 'launch_rocket', params: {} }] }),
		})).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.details[0]?.code === 'effect_unknown_type',
		);
	});

	test('rejects effect params that do not fit the effect', async () => {
		await expect(client.post({
			data: draft({ effects: [{ type: 'notify', params: { severity: 'loud', title: 'Hi' } }] }),
		})).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.details[0]?.code === 'effect_params_invalid',
		);
	});

	test('rejects categorising on a schedule trigger', async () => {
		await expect(client.post({
			data: draft({ trigger: { type: 'schedule', schedule: 'monthly' } }),
		})).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.details[0]?.code === 'effect_subject_mismatch',
		);
	});

	test('validates the condition against the trigger subject policy', async () => {
		await expect(client.post({
			data: draft({
				trigger: {
					type: 'event',
					event: 'transaction.created',
					filter_body: { and: [{ field_name: 'balance', operator: 'gte', value: '10.00' }] },
				},
			}),
		})).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.details[0]?.code === 'filter_unknown_field',
		);
	});

	test('accepts a wallet condition on a schedule trigger', async () => {
		const { data } = await client.post({
			data: draft({
				trigger: {
					type: 'schedule',
					schedule: 'monthly',
					filter_body: { and: [{ field_name: 'balance', operator: 'gte', value: '8000.00' }] },
				},
				effects: [{ type: 'notify', params: { severity: 'info', title: 'Sweep ready' } }],
			}),
		});

		expect(data.trigger.schedule).toBe('monthly');
		expect(data.trigger.filter_body).not.toBeNull();
	});

	test('replaces the trigger whole on patch and never merges it', async () => {
		const created = await client.post({ data: draft() });

		const patched = await client.patch({
			id: created.data.id,
			data: {
				trigger: { type: 'event', event: 'transaction.updated', filter_body: null },
			},
		});

		expect(patched.data.trigger.event).toBe('transaction.updated');
		expect(patched.data.trigger.filter_body).toBeNull();
	});

	test('disables a rule through patch rather than a toggle', async () => {
		const created = await client.post({ data: draft() });

		const patched = await client.patch({ id: created.data.id, data: { enabled: false } });
		const enabled = await client.list({ params: { enabled: true } });

		expect(patched.data.enabled).toBe(false);
		expect(enabled.data.some((rule) => rule.id === created.data.id)).toBe(false);
	});

	test('toggles a seeded rule whose stored effects are incomplete', async () => {
		const seeded = new AutomationsMockRESTApiClient('automations-seeded');
		const listed = await seeded.list({});
		const sweep = listed.data.find((rule) => rule.name === 'Monthly savings sweep');

		const patched = await seeded.patch({ id: sweep?.id ?? '', data: { enabled: true } });

		expect(patched.data.enabled).toBe(true);
	});

	test('still validates effects when the patch carries them', async () => {
		const created = await client.post({ data: draft() });

		await expect(client.patch({
			id: created.data.id,
			data: { effects: [{ type: 'set_category', params: {} }] },
		})).rejects.toSatisfy(
			(error: unknown) => isApiError(error) && error.details[0]?.code === 'effect_params_invalid',
		);
	});

	test('soft-deletes a rule and hides it from the list', async () => {
		const created = await client.post({ data: draft() });

		const deleted = await client.delete({ id: created.data.id });
		const listed = await client.list({});

		expect(deleted.data.deleted_at).not.toBeNull();
		expect(listed.data.some((rule) => rule.id === created.data.id)).toBe(false);
	});

	test('replays a repeated idempotency key without creating a second rule', async () => {
		const first = await client.post({ data: draft(), idempotencyKey: 'key-1' });
		const replay = await client.post({ data: draft(), idempotencyKey: 'key-1' });

		expect(replay.meta.idempotent_replay).toBe(true);
		expect(replay.data.id).toBe(first.data.id);
	});
});
