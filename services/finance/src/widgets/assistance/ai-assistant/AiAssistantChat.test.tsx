import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { AiAssistantChat } from './AiAssistantChat.tsx';
import { ASSISTANT_CHAT_ERROR, ASSISTANT_QUOTA_ERROR } from './config.ts';

import type { AssistantMessage } from '@entity/assistance';


const message = (id: string, role: AssistantMessage['role'], text: string): AssistantMessage => ({
	id,
	createdAt: '2026-01-01T00:00:00.000Z',
	role,
	status: 'complete',
	text,
	refs: [],
});

const NO_MESSAGES: AssistantMessage[] = [];
const PROMPTS = ['Where did my money go?'];

type ChatProps = Parameters<typeof AiAssistantChat>[0];

const renderChat = (overrides: Partial<ChatProps> = {}) => {
	const onSend = vi.fn();
	const propsOf = (extra: Partial<ChatProps>): ChatProps => ({
		messages: NO_MESSAGES,
		prompts: PROMPTS,
		streamed: '',
		quota: null,
		isPending: false,
		isError: false,
		onSend,
		...overrides,
		...extra,
	});

	const { rerender } = render(<AiAssistantChat {...propsOf({})} />);

	return {
		onSend,
		update: (extra: Partial<ChatProps>) => { rerender(<AiAssistantChat {...propsOf(extra)} />); },
	};
};

const typeAndSend = (text: string): void => {
	fireEvent.change(screen.getByRole('textbox'), { target: { value: text } });
	fireEvent.click(screen.getByRole('button', { name: 'Send' }));
};

describe('AiAssistantChat', () => {
	test('sends the trimmed draft and clears the input', () => {
		const { onSend } = renderChat();

		typeAndSend('  where did my money go?  ');

		expect(onSend).toHaveBeenCalledWith('where did my money go?');
		expect(screen.getByRole('textbox')).toHaveValue('');
	});

	test('refuses to send a blank draft', () => {
		const { onSend } = renderChat();

		typeAndSend('   ');

		expect(onSend).not.toHaveBeenCalled();
	});

	test('sends a prompt chip as its own turn', () => {
		const { onSend } = renderChat();

		fireEvent.click(screen.getByRole('button', { name: PROMPTS[0] }));

		expect(onSend).toHaveBeenCalledWith(PROMPTS[0]);
	});

	test('locks the composer while a turn is in flight', () => {
		renderChat({ isPending: true });

		expect(screen.getByRole('textbox')).toBeDisabled();
		expect(screen.getByRole('button', { name: PROMPTS[0] })).toBeDisabled();
		expect(screen.getByRole('status')).toBeInTheDocument();
	});

	test('shows streamed text instead of the typing indicator once deltas arrive', () => {
		renderChat({ isPending: true, streamed: 'Counting' });

		expect(screen.getByText('Counting')).toBeInTheDocument();
		expect(screen.queryByRole('status')).not.toBeInTheDocument();
	});

	test('retries the failed turn without the user retyping it', () => {
		const { onSend, update } = renderChat();

		typeAndSend('why?');
		expect(onSend).toHaveBeenCalledWith('why?');

		update({ isError: true });
		expect(screen.getByText(ASSISTANT_CHAT_ERROR)).toBeInTheDocument();

		fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

		expect(onSend).toHaveBeenCalledTimes(2);
		expect(onSend).toHaveBeenLastCalledWith('why?');
	});

	test('shows what is left of the allowance', () => {
		renderChat({ quota: { messagesLeft: 2, allowance: 10 } });

		expect(screen.getByText('2 of 10 messages left')).toBeInTheDocument();
	});

	test('says nothing about quota before the server reports one', () => {
		renderChat();

		expect(screen.queryByText(/messages left/)).not.toBeInTheDocument();
	});

	test('locks the composer once the allowance is spent', () => {
		const { onSend } = renderChat({ quota: { messagesLeft: 0, allowance: 10 } });

		expect(screen.getByText('No messages left')).toBeInTheDocument();
		expect(screen.getByRole('textbox')).toBeDisabled();
		expect(screen.getByRole('button', { name: PROMPTS[0] })).toBeDisabled();

		fireEvent.click(screen.getByRole('button', { name: PROMPTS[0] }));
		expect(onSend).not.toHaveBeenCalled();
	});

	test('locks the composer on a quota error even before any quota is known', () => {
		const { onSend } = renderChat({ exhausted: true });

		expect(screen.getByText('No messages left')).toBeInTheDocument();
		expect(screen.getByRole('textbox')).toBeDisabled();

		fireEvent.click(screen.getByRole('button', { name: PROMPTS[0] }));
		expect(onSend).not.toHaveBeenCalled();
	});

	test('explains a spent quota instead of offering a pointless retry', () => {
		renderChat({ exhausted: true, isError: true });

		expect(screen.getByText(ASSISTANT_QUOTA_ERROR)).toBeInTheDocument();
		expect(screen.queryByText(ASSISTANT_CHAT_ERROR)).not.toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument();
	});

	test('renders history in the order it is given', () => {
		renderChat({
			messages: [message('1', 'user', 'hello'), message('2', 'assistant', 'hi there')],
		});

		expect(screen.getByText('hello')).toBeInTheDocument();
		expect(screen.getByText('hi there')).toBeInTheDocument();
	});
});
