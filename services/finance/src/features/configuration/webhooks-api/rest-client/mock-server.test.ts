import { beforeEach, describe, expect, it, vi } from "vitest";

import { WebhookMockRESTApiClient } from "./mock-server.ts";


describe('WebhookMockRESTApiClient', () => {
	let client: WebhookMockRESTApiClient;

	beforeEach(() => {
		const store = new Map<string, string>();

		vi.stubGlobal('localStorage', {
			getItem: (key: string) => store.get(key) ?? null,
			setItem: (key: string, value: string) => { store.set(key, value); },
			removeItem: (key: string) => { store.delete(key); },
			clear: () => { store.clear(); },
		});

		client = new WebhookMockRESTApiClient('webhooks-test');
	});

	it('seeds a starting set so the list is never empty on first run', async () => {
		const listed = await client.list({});

		expect(listed.data.length).toBeGreaterThan(0);
		expect(listed.meta.total).toBe(listed.data.length);
	});

	it('creates a webhook with a secret and returns it through get', async () => {
		const created = await client.post({ data: { title: 'Deploys', url: 'https://example.com/hook' } });

		expect(created.secret).toMatch(/^whsec_[0-9a-f]{48}$/);

		const fetched = await client.get({ id: created.id });

		expect(fetched.title).toBe('Deploys');
		expect(fetched.url).toBe('https://example.com/hook');
	});

	it('persists creations into the list', async () => {
		const before = await client.list({});
		await client.post({ data: { title: 'Extra', url: 'https://example.com/extra' } });
		const after = await client.list({});

		expect(after.meta.total).toBe(before.meta.total + 1);
	});

	it('patches only the provided fields and bumps updated_at', async () => {
		const created = await client.post({ data: { title: 'Old', url: 'https://example.com/a' } });
		const patched = await client.patch({ id: created.id, data: { title: 'New' } });

		expect(patched.title).toBe('New');
		expect(patched.url).toBe('https://example.com/a');
		expect(Date.parse(patched.meta.updated_at)).toBeGreaterThanOrEqual(Date.parse(created.meta.created_at));
	});

	it('rotates the secret without changing identity', async () => {
		const created = await client.post({ data: { title: 'Rotate', url: 'https://example.com/r' } });
		const rotated = await client.rotateSecret({ data: { id: created.id } });

		expect(rotated.id).toBe(created.id);
		expect(rotated.secret).not.toBe(created.secret);
	});

	it('deletes a webhook and stops listing it', async () => {
		const created = await client.post({ data: { title: 'Gone', url: 'https://example.com/g' } });
		await client.delete({ id: created.id });

		const listed = await client.list({});

		expect(listed.data.find((webhook) => webhook.id === created.id)).toBeUndefined();
	});

	it('paginates via limit and offset', async () => {
		const all = await client.list({});
		const page = await client.list({ params: { limit: 1, offset: 1 } });

		expect(page.data).toHaveLength(1);
		expect(page.meta.total).toBe(all.meta.total);
		expect(page.data[0].id).toBe(all.data[1].id);
	});

	it('rejects reads for a missing webhook', async () => {
		await expect(client.get({ id: 'nope' })).rejects.toThrow(/not found/);
	});
});
