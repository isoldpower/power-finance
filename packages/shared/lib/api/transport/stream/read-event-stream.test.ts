import { describe, expect, test } from 'vitest';

import { readEventStream } from './read-event-stream.ts';

import type { StreamMessage } from './types.ts';


const responseOf = (chunks: string[]): Response => new Response(new ReadableStream<Uint8Array>({
	start(controller) {
		const encoder = new TextEncoder();
		chunks.forEach((chunk) => { controller.enqueue(encoder.encode(chunk)); });
		controller.close();
	},
}));

const collect = async (chunks: string[]): Promise<StreamMessage[]> => {
	const messages: StreamMessage[] = [];
	await readEventStream(responseOf(chunks), (message) => { messages.push(message); });

	return messages;
};

describe('readEventStream', () => {
	test('reads LF-separated frames', async () => {
		const messages = await collect([': connected\n\nevent: notification.created\ndata: {"id":"1"}\n\n']);

		expect(messages).toEqual([{ event: 'notification.created', id: null, data: '{"id":"1"}' }]);
	});

	test('reads CRLF-separated frames, even when a line break is split across chunks', async () => {
		const messages = await collect(['event: notification.created\r\ndata: {"id":"2"}\r', '\n\r\n']);

		expect(messages).toEqual([{ event: 'notification.created', id: null, data: '{"id":"2"}' }]);
	});
});
