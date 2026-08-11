import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { FxMockRESTApiClient } from "@feature/localization";
import type { IFxRESTApiClient } from "@feature/localization";


interface UseFxApiResponse {
	rest: IFxRESTApiClient;
}

function useFxApi(baseUrl: string): UseFxApiResponse {
	const fxAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/fx`
	});

	const restFxClient = useMemo<IFxRESTApiClient>(() => {
		return new FxMockRESTApiClient();
	}, [fxAxiosInstance]);

	return useMemo(() => ({
		rest: restFxClient
	}), [restFxClient]);
}

export { useFxApi };
export type { UseFxApiResponse };
