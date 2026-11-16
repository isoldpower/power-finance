import { useMemo } from "react";

import { BalancesHttpRESTApiClient, BalancesMockRESTApiClient } from "@feature/flow";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { IBalancesRESTApiClient } from "@feature/flow";
import type { ApiServerOptions } from "./types.ts";


interface UseBalancesApiResponse {
	rest: IBalancesRESTApiClient;
}

function useBalancesApi(options: ApiServerOptions): UseBalancesApiResponse {
	const axiosInstance = useResourceAxios(options);

	const restClient = useMemo<IBalancesRESTApiClient>(() => {
		return options.mode === 'live'
			? new BalancesHttpRESTApiClient(axiosInstance, options.versions)
			: new BalancesMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions]);

	return useMemo(() => ({
		rest: restClient,
	}), [restClient]);
}

export { useBalancesApi };
export type { UseBalancesApiResponse };
