import { useMemo } from "react";

import { TransactionDjangoRESTApiClient, TransactionMockRESTApiClient } from "@feature/transactions";
import type { ITransactionsRESTApiClient } from "@feature/transactions";
import { useAxiosInstance } from "@internal/shared";

const USE_DJANGO_BACKEND: boolean = false;

interface UseTransactionsApiResponse {
	rest: ITransactionsRESTApiClient;
}

function useTransactionsApi(baseUrl: string): UseTransactionsApiResponse {
	const transactionsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/transactions`
	});

	const restTransactionsClient = useMemo<ITransactionsRESTApiClient>(() => {
		return USE_DJANGO_BACKEND
			? new TransactionDjangoRESTApiClient(transactionsAxiosInstance)
			: new TransactionMockRESTApiClient('transactions');
	}, [transactionsAxiosInstance]);

	return useMemo(() => ({
		rest: restTransactionsClient
	}), [restTransactionsClient]);
}

export { useTransactionsApi };
