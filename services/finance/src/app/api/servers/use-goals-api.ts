import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { GoalsMockRESTApiClient } from "@feature/wallets";
import { API_BASE_PATH } from "../config.ts";
import type { IGoalsRESTApiClient } from "@feature/wallets";

interface UseGoalsApiResponse {
	rest: IGoalsRESTApiClient;
}

function useGoalsApi(baseUrl: string): UseGoalsApiResponse {
	const goalsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}${API_BASE_PATH}/goals`
	});

	const restGoalsClient = useMemo<IGoalsRESTApiClient>(() => {
		return new GoalsMockRESTApiClient();
	}, [goalsAxiosInstance]);

	return useMemo(() => ({
		rest: restGoalsClient
	}), [restGoalsClient]);
}

export { useGoalsApi };
export type { UseGoalsApiResponse };
