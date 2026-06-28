import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { AutomationsMockRESTApiClient, AutomationsDjangoRESTApiClient } from "@feature/automations";
import type { IAutomationsRESTApiClient } from "@feature/automations";

const USE_DJANGO_BACKEND = false as boolean;

interface UseAutomationsApiResponse {
	rest: IAutomationsRESTApiClient;
}

function useAutomationsApi(baseUrl: string): UseAutomationsApiResponse {
	const automationsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/automations`
	});

	const restAutomationsClient = useMemo<IAutomationsRESTApiClient>(() => {
		return USE_DJANGO_BACKEND
			? new AutomationsDjangoRESTApiClient(automationsAxiosInstance)
			: new AutomationsMockRESTApiClient();
	}, [automationsAxiosInstance]);

	return useMemo(() => ({
		rest: restAutomationsClient
	}), [restAutomationsClient]);
}

export { useAutomationsApi };
export type { UseAutomationsApiResponse };
