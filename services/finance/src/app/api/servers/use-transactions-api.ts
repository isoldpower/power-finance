import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { TransactionMockRESTApiClient } from "@feature/transactions";
import { API_BASE_PATH } from "../config.ts";
import type { ITransactionsRESTApiClient } from "@feature/transactions";

interface UseTransactionsApiResponse {
	rest: ITransactionsRESTApiClient;
}

function useTransactionsApi(baseUrl: string): UseTransactionsApiResponse {
	const transactionsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}${API_BASE_PATH}/transactions`
	});

	const restTransactionsClient = useMemo<ITransactionsRESTApiClient>(() => {
		return new TransactionMockRESTApiClient();
	}, [transactionsAxiosInstance]);

	return useMemo(() => ({
		rest: restTransactionsClient
	}), [restTransactionsClient]);
}

export { useTransactionsApi };
export type { UseTransactionsApiResponse };
