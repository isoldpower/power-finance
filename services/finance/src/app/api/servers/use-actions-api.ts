import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { ActionsMockRESTApiClient } from "@feature/assistance";
import type { IActionsRESTApiClient } from "@feature/assistance";


interface UseActionsApiResponse {
	rest: IActionsRESTApiClient;
}

function useActionsApi(baseUrl: string): UseActionsApiResponse {
	const actionsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/actions`
	});

	const restActionsClient = useMemo<IActionsRESTApiClient>(() => {
		return new ActionsMockRESTApiClient();
	}, [actionsAxiosInstance]);

	return useMemo(() => ({
		rest: restActionsClient
	}), [restActionsClient]);
}

export { useActionsApi };
export type { UseActionsApiResponse };
