import { useAxiosInstance } from "./axios-handler/useAxiosInstance.ts";
import { useEffect, useMemo } from "react";
import { ITransactionsRESTApiClient, TransactionMockRESTApiClient } from "@feature/transaction";


interface UseTransactionsApiResponse {
	rest: ITransactionsRESTApiClient;
}

function useTransactionsApi(baseUrl: string): UseTransactionsApiResponse {
	const transactionsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/transactions`
	});

	useEffect(() => {
		console.log("useTransactionsApi", transactionsAxiosInstance);
	}, [transactionsAxiosInstance]);

	const restWalletsClient = useMemo<ITransactionsRESTApiClient>(() => {
		return new TransactionMockRESTApiClient("transactions", "wallets");
	}, []);

	return useMemo(() => ({
		rest: restWalletsClient
	}), [restWalletsClient]);
}

export { useTransactionsApi };
