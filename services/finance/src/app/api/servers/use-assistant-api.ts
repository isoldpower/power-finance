import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { AssistantMockRESTApiClient } from "@feature/assistance";
import { API_BASE_PATH } from "../config.ts";
import type { IAssistantRESTApiClient } from "@feature/assistance";

interface UseAssistantApiResponse {
	rest: IAssistantRESTApiClient;
}

function useAssistantApi(baseUrl: string): UseAssistantApiResponse {
	const assistantAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}${API_BASE_PATH}/assistant`
	});

	const restAssistantClient = useMemo<IAssistantRESTApiClient>(() => {
		return new AssistantMockRESTApiClient();
	}, [assistantAxiosInstance]);

	return useMemo(() => ({
		rest: restAssistantClient
	}), [restAssistantClient]);
}

export { useAssistantApi };
export type { UseAssistantApiResponse };
