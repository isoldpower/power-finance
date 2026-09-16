import { useCallback, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { isQuotaExhausted } from "@shared/api";
import { sendAssistantMessage } from "../../assistant-api";
import { ASSISTANT_CACHE_KEYS } from "../cache-config.ts";
import { messageFromText, optimisticMessageId, useOptimisticMessages } from "./optimistic";

import type { AssistantQuota } from "@entity/assistance";
import type { SendAssistantMessageResponse } from "../../assistant-api";
import type { MessageCachesSnapshot } from "./optimistic";


interface SendMessageContext {
	snapshot: MessageCachesSnapshot;
	temporaryId: string;
}

interface UseSendAssistantMessageReturn {
	send: (text: string) => void;
	streamed: string;
	quota: AssistantQuota | null;
	exhausted: boolean;
	isPending: boolean;
	isError: boolean;
}

const useSendAssistantMessage = (): UseSendAssistantMessageReturn => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const optimistic = useOptimisticMessages();
	const [streamed, setStreamed] = useState<string>('');
	const [quota, setQuota] = useState<AssistantQuota | null>(null);
	const [exhausted, setExhausted] = useState<boolean>(false);

	const mutation = useMutation<SendAssistantMessageResponse, Error, string, SendMessageContext>({
		mutationKey: [ASSISTANT_CACHE_KEYS.send],
		mutationFn: (text: string) => sendAssistantMessage({
			handler: apiContext.assistantServers.rest,
			text,
			onDelta: (chunk) => { setStreamed((previous) => previous + chunk); },
		}),
		onMutate: async (text: string) => {
			const snapshot = await optimistic.capture();
			const temporaryId = optimisticMessageId();
			optimistic.applySend(messageFromText(text, temporaryId, new Date().toISOString()));

			return { snapshot, temporaryId };
		},
		onSuccess: (reply) => {
			optimistic.applyReply(reply.message);

			if (reply.quota !== null) {
				setQuota(reply.quota);
				setExhausted(reply.quota.messagesLeft <= 0);
			}
		},
		onError: (error, _text, context) => {
			optimistic.restore(context?.snapshot);

			if (isQuotaExhausted(error)) {
				setExhausted(true);
				setQuota((current) => (current === null ? null : { ...current, messagesLeft: 0 }));
			}
		},
		onSettled: () => {
			setStreamed('');

			for (const key of DERIVED_KEYS.onAssistantChange) {
				void queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});

	const send = useCallback((text: string) => {
		setStreamed('');
		mutation.mutate(text);
	}, [mutation]);

	return useMemo(() => ({
		send,
		streamed,
		quota,
		exhausted,
		isPending: mutation.isPending,
		isError: mutation.isError,
	}), [send, streamed, quota, exhausted, mutation.isPending, mutation.isError]);
};

export { useSendAssistantMessage };
export type { SendMessageContext, UseSendAssistantMessageReturn };
