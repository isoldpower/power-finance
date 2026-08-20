import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { ActionsMockRESTApiClient } from "@feature/assistance";
import { API_BASE_PATH } from "../config.ts";
import type { IActionsRESTApiClient } from "@feature/assistance";

interface UseActionsApiResponse {
	rest: IActionsRESTApiClient;
}

function useActionsApi(baseUrl: string): UseActionsApiResponse {
	const actionsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}${API_BASE_PATH}/actions`
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
