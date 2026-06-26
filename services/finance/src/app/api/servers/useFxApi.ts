import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { FxMockRESTApiClient, FxDjangoRESTApiClient } from "@feature/fx";
import type { IFxRESTApiClient } from "@feature/fx";

const USE_DJANGO_BACKEND: boolean = false;

interface UseFxApiResponse {
	rest: IFxRESTApiClient;
}

function useFxApi(baseUrl: string): UseFxApiResponse {
	const fxAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/fx`
	});

	const restFxClient = useMemo<IFxRESTApiClient>(() => {
		return USE_DJANGO_BACKEND
			? new FxDjangoRESTApiClient(fxAxiosInstance)
			: new FxMockRESTApiClient();
	}, [fxAxiosInstance]);

	return useMemo(() => ({
		rest: restFxClient
	}), [restFxClient]);
}

export { useFxApi };
export type { UseFxApiResponse };
