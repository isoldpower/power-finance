import { useCallback, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { sendAssistantMessage } from "../../assistant-api";
import { ASSISTANT_CACHE_KEYS } from "../cache-config.ts";
import { messageFromText, optimisticMessageId, useOptimisticMessages } from "./optimistic";

import type { SendAssistantMessageResponse } from "../../assistant-api";
import type { MessageCachesSnapshot } from "./optimistic";


interface SendMessageContext {
	snapshot: MessageCachesSnapshot;
	temporaryId: string;
}

interface UseSendAssistantMessageReturn {
	send: (text: string) => void;
	streamed: string;
	isPending: boolean;
	isError: boolean;
}

const useSendAssistantMessage = (): UseSendAssistantMessageReturn => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const optimistic = useOptimisticMessages();
	const [streamed, setStreamed] = useState<string>('');

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
		onError: (_error, _text, context) => {
			optimistic.restore(context?.snapshot);
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
		isPending: mutation.isPending,
		isError: mutation.isError,
	}), [send, streamed, mutation.isPending, mutation.isError]);
};

export { useSendAssistantMessage };
export type { SendMessageContext, UseSendAssistantMessageReturn };
