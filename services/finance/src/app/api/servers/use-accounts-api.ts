import { useMemo } from "react";

import { AccountsHttpRESTApiClient, AccountsMockRESTApiClient } from "@feature/accounts";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { IAccountsRESTApiClient } from "@feature/accounts";
import type { ApiServerOptions } from "./types.ts";


const ACCOUNTS_PATH = '/accounts';

interface UseAccountsApiResponse {
	rest: IAccountsRESTApiClient;
}

function useAccountsApi(options: ApiServerOptions): UseAccountsApiResponse {
	const axiosInstance = useResourceAxios(options, ACCOUNTS_PATH);

	const restClient = useMemo<IAccountsRESTApiClient>(() => {
		return options.mode === 'live'
			? new AccountsHttpRESTApiClient(axiosInstance, options.versions)
			: new AccountsMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions]);

	return useMemo(() => ({
		rest: restClient
	}), [restClient]);
}

export { useAccountsApi };
export type { UseAccountsApiResponse };
