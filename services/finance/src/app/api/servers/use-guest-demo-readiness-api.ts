import { useMemo } from "react";

import { GuestDemoReadinessHttpRESTApiClient, GuestDemoReadinessMockRESTApiClient } from "@feature/accounts";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { IGuestDemoReadinessRESTApiClient } from "@feature/accounts";
import type { ApiServerOptions } from "./types.ts";


const API_ROOT_PATH = '';

interface UseGuestDemoReadinessApiResponse {
	rest: IGuestDemoReadinessRESTApiClient;
}

function useGuestDemoReadinessApi(options: ApiServerOptions): UseGuestDemoReadinessApiResponse {
	const axiosInstance = useResourceAxios(options, API_ROOT_PATH);

	const restClient = useMemo<IGuestDemoReadinessRESTApiClient>(() => {
		return options.mode === 'live'
			? new GuestDemoReadinessHttpRESTApiClient(axiosInstance)
			: new GuestDemoReadinessMockRESTApiClient();
	}, [axiosInstance, options.mode]);

	return useMemo(() => ({
		rest: restClient
	}), [restClient]);
}

export { useGuestDemoReadinessApi };
export type { UseGuestDemoReadinessApiResponse };
