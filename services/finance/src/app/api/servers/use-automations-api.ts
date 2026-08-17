import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { AutomationsMockRESTApiClient } from "@feature/assistance";
import { API_BASE_PATH } from "../config.ts";
import type { IAutomationsRESTApiClient } from "@feature/assistance";

interface UseAutomationsApiResponse {
	rest: IAutomationsRESTApiClient;
}

function useAutomationsApi(baseUrl: string): UseAutomationsApiResponse {
	const automationsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}${API_BASE_PATH}/automations`
	});

	const restAutomationsClient = useMemo<IAutomationsRESTApiClient>(() => {
		return new AutomationsMockRESTApiClient();
	}, [automationsAxiosInstance]);

	return useMemo(() => ({
		rest: restAutomationsClient
	}), [restAutomationsClient]);
}

export { useAutomationsApi };
export type { UseAutomationsApiResponse };
