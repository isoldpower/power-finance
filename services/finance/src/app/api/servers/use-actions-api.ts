import { useMemo } from "react";

import { ActionsHttpRESTApiClient, ActionsMockRESTApiClient } from "@feature/assistance";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { IActionsRESTApiClient } from "@feature/assistance";
import type { ApiServerOptions } from "./types.ts";


const ACTIONS_PATH = '/actions';

interface UseActionsApiResponse {
	rest: IActionsRESTApiClient;
}

function useActionsApi(options: ApiServerOptions): UseActionsApiResponse {
	const axiosInstance = useResourceAxios(options, ACTIONS_PATH);

	const restClient = useMemo<IActionsRESTApiClient>(() => {
		return options.mode === 'live'
			? new ActionsHttpRESTApiClient(axiosInstance, options.versions)
			: new ActionsMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions]);

	return useMemo(() => ({
		rest: restClient
	}), [restClient]);
}

export { useActionsApi };
export type { UseActionsApiResponse };
