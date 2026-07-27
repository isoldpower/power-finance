import { useMemo } from "react";

import { AccountsMockRESTApiClient } from "@feature/accounts";
import type { IAccountsRESTApiClient } from "@feature/accounts";
import { useAxiosInstance } from "@internal/shared";


interface UseAccountsApiResponse {
	rest: IAccountsRESTApiClient;
}

function useAccountsApi(baseUrl: string): UseAccountsApiResponse {
	const accountsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/accounts`
	});

	const restAccountsClient = useMemo<IAccountsRESTApiClient>(() => {
		return new AccountsMockRESTApiClient();
	}, [accountsAxiosInstance]);

	return useMemo(() => ({
		rest: restAccountsClient
	}), [restAccountsClient]);
}

export { useAccountsApi };
