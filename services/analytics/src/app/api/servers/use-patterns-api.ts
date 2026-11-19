import { useMemo } from "react";

import { PatternsHttpRESTApiClient, PatternsMockRESTApiClient } from "@feature/spending";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { IPatternsRESTApiClient } from "@feature/spending";
import type { ApiServerOptions } from "./types.ts";


interface UsePatternsApiResponse {
	rest: IPatternsRESTApiClient;
}

function usePatternsApi(options: ApiServerOptions): UsePatternsApiResponse {
	const axiosInstance = useResourceAxios(options);

	const restClient = useMemo<IPatternsRESTApiClient>(() => {
		return options.mode === 'live'
			? new PatternsHttpRESTApiClient(axiosInstance, options.versions)
			: new PatternsMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions]);

	return useMemo(() => ({
		rest: restClient,
	}), [restClient]);
}

export { usePatternsApi };
export type { UsePatternsApiResponse };
