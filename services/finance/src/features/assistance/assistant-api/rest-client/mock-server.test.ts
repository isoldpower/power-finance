import { describe, test, expect, beforeEach, vi } from 'vitest';

import { AssistantMockRESTApiClient } from './mock-server.ts';

let client: AssistantMockRESTApiClient;

beforeEach(() => {
	const store = new Map<string, string>();

	vi.stubGlobal('localStorage', {
		getItem: (key: string) => store.get(key) ?? null,
		setItem: (key: string, value: string) => { store.set(key, value); },
		removeItem: (key: string) => { store.delete(key); },
		clear: () => { store.clear(); },
	});

	client = new AssistantMockRESTApiClient('assistant-messages-test');
});

describe('AssistantMockRESTApiClient', () => {
	test('serves signals and prompts without pagination', async () => {
		const { data } = await client.overview({});

		expect(data.signals.length).toBeGreaterThan(0);
		expect(data.prompts.length).toBeGreaterThan(0);
		expect(data.signals[0].tone).toBe('positive');
	});

	test('lists the conversation newest first', async () => {
		const { data, meta } = await client.messages({});

		expect(data).toHaveLength(3);
		expect(new Date(data[0].created_at).getTime()).toBeGreaterThan(new Date(data[1].created_at).getTime());
		expect(meta.total).toBe(3);
	});

	test('announces both ids before any text arrives', async () => {
		const order: string[] = [];

		await client.send({
			data: { text: 'Why is my dining spend up?' },
			onAccepted: () => { order.push('accepted'); },
			onDelta: () => { order.push('delta'); },
		});

		expect(order[0]).toBe('accepted');
		expect(order.filter((event) => event === 'delta').length).toBeGreaterThan(1);
	});

	test('persists both messages and returns the finished reply', async () => {
		const reply = await client.send({ data: { text: 'Where did my money go?' } });
		const { data } = await client.messages({});

		expect(reply.status).toBe('complete');
		expect(reply.role).toBe('assistant');
		expect(data).toHaveLength(5);
		expect(data[0].id).toBe(reply.id);
	});

	test('streams deltas that concatenate into the reply', async () => {
		let streamed = '';

		const reply = await client.send({
			data: { text: 'Explain my spending spike' },
			onDelta: (delta) => { streamed += delta.text; },
		});

		expect(streamed).toBe(reply.text);
	});

	test('clears the whole conversation and reports the count', async () => {
		const cleared = await client.clear({});
		const { data } = await client.messages({});

		expect(cleared.data.deleted).toBe(3);
		expect(data).toHaveLength(0);
	});

	test('clearing an empty conversation succeeds with zero', async () => {
		await client.clear({});

		const repeated = await client.clear({});

		expect(repeated.data.deleted).toBe(0);
	});

	test('pages the conversation with opaque cursors', async () => {
		const first = await client.messages({ params: { limit: 2 } });
		const second = await client.messages({ params: { limit: 2, cursor: first.meta.next_cursor ?? '' } });

		expect(first.data).toHaveLength(2);
		expect(second.data).toHaveLength(1);
	});
});
