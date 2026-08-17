import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { listAssistantMessages } from "../../assistant-api";
import { ASSISTANT_CACHE_KEYS } from "../cache-config.ts";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { PageParams } from "@shared/api";
import type { AssistantMessage } from "@entity/assistance";
import type { ListAssistantMessagesResponse } from "../../assistant-api";


type UseAssistantMessagesOptions = Omit<
	UseQueryOptions<ListAssistantMessagesResponse>,
	'queryKey' | 'queryFn'
>;

type UseAssistantMessagesReturn = UseQueryResult<ListAssistantMessagesResponse> & {
	messages: AssistantMessage[];
	total: number;
	nextCursor: string | null;
};

const EMPTY_MESSAGES: AssistantMessage[] = [];

const useAssistantMessages = (
	page?: PageParams,
	options?: UseAssistantMessagesOptions
): UseAssistantMessagesReturn => {
	const apiContext = useApiContext();
	const messagesQuery = useQuery<ListAssistantMessagesResponse>({
		queryKey: [ASSISTANT_CACHE_KEYS.messages, page?.limit ?? 'default', page?.cursor ?? 'first'],
		queryFn: () => listAssistantMessages({
			handler: apiContext.assistantServers.rest,
			page,
		}),
		...options ?? {},
	});

	return useMemo(() => ({
		...messagesQuery,
		messages: messagesQuery.data?.page.items ?? EMPTY_MESSAGES,
		total: messagesQuery.data?.page.total ?? 0,
		nextCursor: messagesQuery.data?.page.nextCursor ?? null,
	}), [messagesQuery]);
};

export { useAssistantMessages };
export type { UseAssistantMessagesOptions, UseAssistantMessagesReturn };
