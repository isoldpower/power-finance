import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { getAssistantContent, assistantContentFromApi } from "../../assistance-api/assistant";
import { useApiContext } from "@app/api";
import { ASSISTANT_CACHE_KEYS } from "../cache-config.ts";
import type { AssistantContent } from "@entity/assistance";
import type { GetAssistantContentResponse } from "../../assistance-api/assistant";


type UseAssistantContentOptions = Omit<
	UseQueryOptions<GetAssistantContentResponse>,
	'queryKey' | 'queryFn'
>;

type UseAssistantContentReturn = UseQueryResult & {
	content: AssistantContent;
};

const EMPTY_CONTENT: AssistantContent = { signals: [], chat: [], prompts: [] };

const useAssistantContent = (
	options?: UseAssistantContentOptions
): UseAssistantContentReturn => {
	const apiContext = useApiContext();
	const query = useQuery<GetAssistantContentResponse>({
		queryKey: [ASSISTANT_CACHE_KEYS.content],
		queryFn: () => getAssistantContent({ handler: apiContext.assistantServers.rest }),
		...options ?? {}
	});

	const content = useMemo(() => {
		return query.data ? assistantContentFromApi(query.data) : EMPTY_CONTENT;
	}, [query.data]);

	return { ...query, content };
};

export { useAssistantContent };
export type { UseAssistantContentOptions, UseAssistantContentReturn };
