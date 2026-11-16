import { useMemo } from "react";

import { LedgerHttpRESTApiClient, LedgerMockRESTApiClient } from "@feature/filters";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { ILedgerRESTApiClient } from "@feature/filters";
import type { ApiServerOptions } from "./types.ts";


interface UseLedgerApiResponse {
	rest: ILedgerRESTApiClient;
}

function useLedgerApi(options: ApiServerOptions): UseLedgerApiResponse {
	const axiosInstance = useResourceAxios(options);

	const restClient = useMemo<ILedgerRESTApiClient>(() => {
		return options.mode === 'live'
			? new LedgerHttpRESTApiClient(axiosInstance, options.versions)
			: new LedgerMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions]);

	return useMemo(() => ({
		rest: restClient,
	}), [restClient]);
}

export { useLedgerApi };
export type { UseLedgerApiResponse };
