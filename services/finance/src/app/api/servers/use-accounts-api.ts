import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { AccountsMockRESTApiClient } from "@feature/accounts";
import { API_BASE_PATH } from "../config.ts";
import type { IAccountsRESTApiClient } from "@feature/accounts";

interface UseAccountsApiResponse {
	rest: IAccountsRESTApiClient;
}

function useAccountsApi(baseUrl: string): UseAccountsApiResponse {
	const accountsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}${API_BASE_PATH}/accounts`
	});

	const restAccountsClient = useMemo<IAccountsRESTApiClient>(() => {
		return new AccountsMockRESTApiClient();
	}, [accountsAxiosInstance]);

	return useMemo(() => ({
		rest: restAccountsClient
	}), [restAccountsClient]);
}

export { useAccountsApi };
export type { UseAccountsApiResponse };
