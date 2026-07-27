import { useMemo } from "react";

import { TransactionMockRESTApiClient } from "@feature/transactions";
import type { ITransactionsRESTApiClient } from "@feature/transactions";
import { useAxiosInstance } from "@internal/shared";


interface UseTransactionsApiResponse {
	rest: ITransactionsRESTApiClient;
}

function useTransactionsApi(baseUrl: string): UseTransactionsApiResponse {
	const transactionsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/transactions`
	});

	const restTransactionsClient = useMemo<ITransactionsRESTApiClient>(() => {
		return new TransactionMockRESTApiClient('transactions');
	}, [transactionsAxiosInstance]);

	return useMemo(() => ({
		rest: restTransactionsClient
	}), [restTransactionsClient]);
}

export { useTransactionsApi };
