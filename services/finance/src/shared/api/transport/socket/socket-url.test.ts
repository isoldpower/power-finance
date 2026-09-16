import { describe, expect, test } from 'vitest';

import { parseSocketFrame } from './parse-socket-frame.ts';
import { toSocketUrl } from './socket-url.ts';


describe('toSocketUrl', () => {
	test('upgrades http to ws', () => {
		expect(toSocketUrl('http://localhost:8080/api/v1/chat/advice'))
			.toBe('ws://localhost:8080/api/v1/chat/advice');
	});

	test('upgrades https to wss', () => {
		expect(toSocketUrl('https://api.example.com/api/v1/chat/advice'))
			.toBe('wss://api.example.com/api/v1/chat/advice');
	});

	test('carries the sandbox in the query, since a handshake takes no headers', () => {
		expect(toSocketUrl('http://localhost:8080/api/v1/chat/advice', { sandbox: 'nikita' }))
			.toBe('ws://localhost:8080/api/v1/chat/advice?sandbox=nikita');
	});

	test('escapes a sandbox that needs it', () => {
		expect(toSocketUrl('http://localhost:8080/chat', { sandbox: 'feature/ai chat' }))
			.toBe('ws://localhost:8080/chat?sandbox=feature%2Fai+chat');
	});

	test('leaves the query alone when no sandbox is configured', () => {
		expect(toSocketUrl('http://localhost:8080/chat', {}))
			.toBe('ws://localhost:8080/chat');
		expect(toSocketUrl('http://localhost:8080/chat', { sandbox: '' }))
			.toBe('ws://localhost:8080/chat');
	});
});

describe('parseSocketFrame', () => {
	test('reads a frame carrying an event and data', () => {
		expect(parseSocketFrame('{"event":"delta","data":{"text":"hi"}}'))
			.toEqual({
				event: 'delta',
				data: { text: 'hi' },
				envelope: { event: 'delta', data: { text: 'hi' } },
			});
	});

	test('keeps envelope fields the transport does not know about', () => {
		const frame = parseSocketFrame('{"event":"message","data":{},"quota":{"messages_left":2}}');

		expect(frame?.envelope.quota).toEqual({ messages_left: 2 });
	});

	test('rejects a frame with no event name', () => {
		expect(parseSocketFrame('{"data":{"text":"hi"}}')).toBeNull();
	});

	test('rejects malformed json rather than throwing', () => {
		expect(parseSocketFrame('not json')).toBeNull();
	});
});
