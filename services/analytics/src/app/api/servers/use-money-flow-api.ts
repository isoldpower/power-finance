import { useMemo } from "react";

import { MoneyFlowHttpRESTApiClient, MoneyFlowMockRESTApiClient } from "@feature/flow";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { IMoneyFlowRESTApiClient } from "@feature/flow";
import type { ApiServerOptions } from "./types.ts";


interface UseMoneyFlowApiResponse {
	rest: IMoneyFlowRESTApiClient;
}

function useMoneyFlowApi(options: ApiServerOptions): UseMoneyFlowApiResponse {
	const axiosInstance = useResourceAxios(options);

	const restClient = useMemo<IMoneyFlowRESTApiClient>(() => {
		return options.mode === 'live'
			? new MoneyFlowHttpRESTApiClient(axiosInstance, options.versions)
			: new MoneyFlowMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions]);

	return useMemo(() => ({
		rest: restClient,
	}), [restClient]);
}

export { useMoneyFlowApi };
export type { UseMoneyFlowApiResponse };
