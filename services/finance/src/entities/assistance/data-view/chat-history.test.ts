import { describe, expect, test } from 'vitest';

import { chatHistory } from './chat-history.ts';

import type { AssistantMessage, MessageRole } from '../types.ts';


const message = (id: string, role: MessageRole, createdAt: string): AssistantMessage => ({
	id,
	createdAt,
	role,
	status: 'complete',
	text: id,
	refs: [],
});

const idsOf = (messages: AssistantMessage[]): string[] => messages.map((message) => message.id);

describe('chatHistory', () => {
	test('puts the newest turn last whatever order the server sent', () => {
		const newestFirst = [
			message('c', 'user', '2026-09-15T10:02:00.000Z'),
			message('b', 'user', '2026-09-15T10:01:00.000Z'),
			message('a', 'user', '2026-09-15T10:00:00.000Z'),
		];

		expect(idsOf(chatHistory(newestFirst))).toEqual(['a', 'b', 'c']);
		expect(idsOf(chatHistory([...newestFirst].reverse()))).toEqual(['a', 'b', 'c']);
	});

	test('keeps a question above its answer when they share a timestamp', () => {
		const sameInstant = [
			message('reply', 'assistant', '2026-09-15T10:00:00.000Z'),
			message('question', 'user', '2026-09-15T10:00:00.000Z'),
		];

		expect(idsOf(chatHistory(sameInstant))).toEqual(['question', 'reply']);
	});

	test('compares instants, not strings, across timestamp formats', () => {
		const mixedFormats = [
			message('second', 'user', '2026-09-15T10:00:01Z'),
			message('first', 'user', '2026-09-15T12:00:00+02:00'),
		];

		expect(idsOf(chatHistory(mixedFormats))).toEqual(['first', 'second']);
	});

	test('orders same-instant same-role messages stably by id', () => {
		const collided = [
			message('z', 'user', '2026-09-15T10:00:00.000Z'),
			message('a', 'user', '2026-09-15T10:00:00.000Z'),
		];

		expect(idsOf(chatHistory(collided))).toEqual(['a', 'z']);
	});

	test('leaves the caller array untouched', () => {
		const original = [
			message('b', 'user', '2026-09-15T10:01:00.000Z'),
			message('a', 'user', '2026-09-15T10:00:00.000Z'),
		];

		chatHistory(original);

		expect(idsOf(original)).toEqual(['b', 'a']);
	});
});
