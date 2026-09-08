import { useMemo } from "react";

import { AutomationsHttpRESTApiClient, AutomationsMockRESTApiClient } from "@feature/assistance";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { IAutomationsRESTApiClient } from "@feature/assistance";
import type { ApiServerOptions } from "./types.ts";


const AUTOMATIONS_PATH = '/automations';

interface UseAutomationsApiResponse {
	rest: IAutomationsRESTApiClient;
}

function useAutomationsApi(options: ApiServerOptions): UseAutomationsApiResponse {
	const axiosInstance = useResourceAxios(options, AUTOMATIONS_PATH);

	const restClient = useMemo<IAutomationsRESTApiClient>(() => {
		return options.mode === 'live'
			? new AutomationsHttpRESTApiClient(axiosInstance, options.versions)
			: new AutomationsMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions]);

	return useMemo(() => ({
		rest: restClient
	}), [restClient]);
}

export { useAutomationsApi };
export type { UseAutomationsApiResponse };
