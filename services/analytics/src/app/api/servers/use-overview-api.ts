import { useMemo } from "react";

import { OverviewHttpRESTApiClient, OverviewMockRESTApiClient } from "@feature/overview";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { IOverviewRESTApiClient } from "@feature/overview";
import type { ApiServerOptions } from "./types.ts";


interface UseOverviewApiResponse {
	rest: IOverviewRESTApiClient;
}

function useOverviewApi(options: ApiServerOptions): UseOverviewApiResponse {
	const axiosInstance = useResourceAxios(options);

	const restClient = useMemo<IOverviewRESTApiClient>(() => {
		return options.mode === 'live'
			? new OverviewHttpRESTApiClient(axiosInstance, options.versions)
			: new OverviewMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions]);

	return useMemo(() => ({
		rest: restClient,
	}), [restClient]);
}

export { useOverviewApi };
export type { UseOverviewApiResponse };
