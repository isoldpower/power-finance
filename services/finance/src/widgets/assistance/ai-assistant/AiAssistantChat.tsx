import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AssistantChat, quotaNote } from "@entity/assistance";

import { ASSISTANT_CHAT_ERROR, ASSISTANT_QUOTA_ERROR } from "./config.ts";

import type { FC } from "react";
import type { AssistantMessage, AssistantQuota } from "@entity/assistance";


interface AiAssistantChatProps {
	messages: AssistantMessage[];
	prompts: string[];
	streamed: string;
	quota: AssistantQuota | null;
	exhausted?: boolean;
	isPending: boolean;
	isError: boolean;
	onSend: (text: string) => void;
}

const AiAssistantChat: FC<AiAssistantChatProps> = ({
	messages,
	prompts,
	streamed,
	quota,
	exhausted = false,
	isPending,
	isError,
	onSend,
}) => {
	const [draft, setDraft] = useState<string>('');
	const [lastSent, setLastSent] = useState<string>('');
	const listRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const list = listRef.current;
		if (list === null) return;

		list.scrollTop = list.scrollHeight;
	}, [messages, streamed, isPending, isError]);

	const note = useMemo(() => (quota === null 
		? null 
		: quotaNote(quota)
	), [quota]);
	const spent = exhausted || (note?.exhausted ?? false);
	const locked = isPending || spent;

	const submit = useCallback((text: string) => {
		const trimmed = text.trim();
		if (trimmed === '' || locked) return;

		setLastSent(trimmed);
		setDraft('');
		onSend(trimmed);
	}, [locked, onSend]);

	const handleSubmit = useCallback(() => { 
		submit(draft);
	}, [draft, submit]);
	const handleRetry = useCallback(() => { 
		submit(lastSent);
	}, [lastSent, submit]);

	return (
		<>
			<AssistantChat ref={listRef}>
				{messages.map((message) => (
					message.role === 'user' ? (
						<AssistantChat.UserBubble
							key={message.id}
							text={message.text}
							refs={message.refs}
							pending={message.pending}
						/>
					) : (
						<AssistantChat.AiBubble
							key={message.id}
							text={message.text}
							refs={message.refs}
							pending={message.pending}
						/>
					)
				))}
				{isPending && streamed !== '' ? (
					<AssistantChat.AiBubble text={streamed} streaming={true} />
				) : null}
				{isPending && streamed === '' ? <AssistantChat.Typing /> : null}
				{isError ? (
					<AssistantChat.Error
						message={spent ? ASSISTANT_QUOTA_ERROR : ASSISTANT_CHAT_ERROR}
						onRetry={spent ? undefined : handleRetry}
					/>
				) : null}
			</AssistantChat>
			<AssistantChat.Composer>
				{note === null && !spent ? null : (
					<AssistantChat.Quota
						messagesLeft={note?.messagesLeft ?? 0}
						allowance={note?.allowance ?? 0}
						low={note?.low ?? false}
						exhausted={spent}
					/>
				)}
				<AssistantChat.Prompts>
					{prompts.map((prompt) => (
						<AssistantChat.PromptChip
							key={prompt}
							prompt={prompt}
							disabled={locked}
							onSelect={submit}
						/>
					))}
				</AssistantChat.Prompts>
				<AssistantChat.Input
					value={draft}
					onChange={setDraft}
					onSubmit={handleSubmit}
					disabled={locked}
					placeholder={spent ? 'Message limit reached' : undefined}
				/>
			</AssistantChat.Composer>
		</>
	);
};

AiAssistantChat.displayName = 'AiAssistantChat';

export { AiAssistantChat };
export type { AiAssistantChatProps };
