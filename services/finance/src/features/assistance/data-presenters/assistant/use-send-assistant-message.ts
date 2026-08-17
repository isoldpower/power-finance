import { useCallback, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { sendAssistantMessage } from "../../assistant-api";
import { ASSISTANT_CACHE_KEYS } from "../cache-config.ts";


interface UseSendAssistantMessageReturn {
	send: (text: string) => void;
	streamed: string;
	isPending: boolean;
	isError: boolean;
}

const useSendAssistantMessage = (): UseSendAssistantMessageReturn => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();
	const [streamed, setStreamed] = useState<string>('');

	const mutation = useMutation({
		mutationKey: [ASSISTANT_CACHE_KEYS.send],
		mutationFn: (text: string) => sendAssistantMessage({
			handler: apiContext.assistantServers.rest,
			text,
			onDelta: (chunk) => { setStreamed((previous) => previous + chunk); },
		}),
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
export type { UseSendAssistantMessageReturn };
