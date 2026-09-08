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
});

describe('parseSocketFrame', () => {
	test('reads a frame carrying an event and data', () => {
		expect(parseSocketFrame('{"event":"delta","data":{"text":"hi"}}'))
			.toEqual({ event: 'delta', data: { text: 'hi' } });
	});

	test('rejects a frame with no event name', () => {
		expect(parseSocketFrame('{"data":{"text":"hi"}}')).toBeNull();
	});

	test('rejects malformed json rather than throwing', () => {
		expect(parseSocketFrame('not json')).toBeNull();
	});
});
