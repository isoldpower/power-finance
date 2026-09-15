import { useCallback, useMemo } from "react";
import { useOptimisticCache } from "@shared/data";

import { MESSAGE_RESOURCE } from "./resource.ts";

import type { AssistantMessage } from "@entity/assistance";
import type { MessageCachesSnapshot } from "./types.ts";


interface UseOptimisticMessagesReturn {
	capture: () => Promise<MessageCachesSnapshot>;
	restore: (snapshot: MessageCachesSnapshot | undefined) => void;
	applySend: (message: AssistantMessage) => void;
}

const useOptimisticMessages = (): UseOptimisticMessagesReturn => {
	const cache = useOptimisticCache(MESSAGE_RESOURCE);

	const applySend = useCallback((message: AssistantMessage): void => {
		cache.insertPaged([message]);
	}, [cache]);

	return useMemo(() => ({
		capture: cache.capture,
		restore: cache.restore,
		applySend,
	}), [cache.capture, cache.restore, applySend]);
};

export { useOptimisticMessages };
export type { UseOptimisticMessagesReturn };
