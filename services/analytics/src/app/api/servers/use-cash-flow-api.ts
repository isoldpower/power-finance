import { useMemo } from "react";

import { CashFlowHttpRESTApiClient, CashFlowMockRESTApiClient } from "@feature/flow";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { ICashFlowRESTApiClient } from "@feature/flow";
import type { ApiServerOptions } from "./types.ts";


interface UseCashFlowApiResponse {
	rest: ICashFlowRESTApiClient;
}

function useCashFlowApi(options: ApiServerOptions): UseCashFlowApiResponse {
	const axiosInstance = useResourceAxios(options);

	const restClient = useMemo<ICashFlowRESTApiClient>(() => {
		return options.mode === 'live'
			? new CashFlowHttpRESTApiClient(axiosInstance, options.versions)
			: new CashFlowMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions]);

	return useMemo(() => ({
		rest: restClient,
	}), [restClient]);
}

export { useCashFlowApi };
export type { UseCashFlowApiResponse };
