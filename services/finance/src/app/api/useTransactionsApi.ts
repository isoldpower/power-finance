import { useMemo } from "react";

import { TransactionDjangoRESTApiClient } from "@feature/transaction";
import type { ITransactionsRESTApiClient } from "@feature/transaction";
import { useAxiosInstance } from "@internal/shared";


interface UseTransactionsApiResponse {
	rest: ITransactionsRESTApiClient;
}

function useTransactionsApi(baseUrl: string): UseTransactionsApiResponse {
	const transactionsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/transactions`
	});

	const restTransactionsClient = useMemo<ITransactionsRESTApiClient>(() => {
		return new TransactionDjangoRESTApiClient(transactionsAxiosInstance);
	}, [transactionsAxiosInstance]);

	return useMemo(() => ({
		rest: restTransactionsClient
	}), [restTransactionsClient]);
}

export { useTransactionsApi };
