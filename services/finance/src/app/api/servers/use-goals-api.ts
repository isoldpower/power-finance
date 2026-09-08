import { useMemo } from "react";

import { GoalsHttpRESTApiClient, GoalsMockRESTApiClient } from "@feature/wallets";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { IGoalsRESTApiClient } from "@feature/wallets";
import type { ApiServerOptions } from "./types.ts";


const GOALS_PATH = '/goals';

interface UseGoalsApiResponse {
	rest: IGoalsRESTApiClient;
}

function useGoalsApi(options: ApiServerOptions): UseGoalsApiResponse {
	const axiosInstance = useResourceAxios(options, GOALS_PATH);

	const restClient = useMemo<IGoalsRESTApiClient>(() => {
		return options.mode === 'live'
			? new GoalsHttpRESTApiClient(axiosInstance, options.versions)
			: new GoalsMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions]);

	return useMemo(() => ({
		rest: restClient
	}), [restClient]);
}

export { useGoalsApi };
export type { UseGoalsApiResponse };
