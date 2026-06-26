import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { ActionsMockRESTApiClient, ActionsDjangoRESTApiClient } from "@feature/actions";
import type { IActionsRESTApiClient } from "@feature/actions";

const USE_DJANGO_BACKEND: boolean = false;

interface UseActionsApiResponse {
	rest: IActionsRESTApiClient;
}

function useActionsApi(baseUrl: string): UseActionsApiResponse {
	const actionsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/actions`
	});

	const restActionsClient = useMemo<IActionsRESTApiClient>(() => {
		return USE_DJANGO_BACKEND
			? new ActionsDjangoRESTApiClient(actionsAxiosInstance)
			: new ActionsMockRESTApiClient();
	}, [actionsAxiosInstance]);

	return useMemo(() => ({
		rest: restActionsClient
	}), [restActionsClient]);
}

export { useActionsApi };
export type { UseActionsApiResponse };
