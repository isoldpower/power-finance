import { useMemo } from "react";

import { TransactionsHttpRESTApiClient, TransactionsMockRESTApiClient } from "@feature/transactions";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { ITransactionsRESTApiClient } from "@feature/transactions";
import type { ApiServerOptions } from "./types.ts";


const TRANSACTIONS_PATH = '/transactions';

interface UseTransactionsApiResponse {
	rest: ITransactionsRESTApiClient;
}

function useTransactionsApi(options: ApiServerOptions): UseTransactionsApiResponse {
	const axiosInstance = useResourceAxios(options, TRANSACTIONS_PATH);

	const restClient = useMemo<ITransactionsRESTApiClient>(() => {
		return options.mode === 'live'
			? new TransactionsHttpRESTApiClient(axiosInstance, options.versions)
			: new TransactionsMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions]);

	return useMemo(() => ({
		rest: restClient
	}), [restClient]);
}

export { useTransactionsApi };
export type { UseTransactionsApiResponse };
