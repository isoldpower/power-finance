import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { AutomationsMockRESTApiClient } from "@feature/assistance";
import type { IAutomationsRESTApiClient } from "@feature/assistance";


interface UseAutomationsApiResponse {
	rest: IAutomationsRESTApiClient;
}

function useAutomationsApi(baseUrl: string): UseAutomationsApiResponse {
	const automationsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/automations`
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
