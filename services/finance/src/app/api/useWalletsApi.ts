import { useAxiosInstance } from "./axios-handler/useAxiosInstance.ts";
import { useMemo } from "react";
import { IWalletsRESTApiClient, WalletsDjangoRESTApiClient } from "@feature/wallet";


interface UseWalletsApiResponse {
	rest: IWalletsRESTApiClient;
}

function useWalletsApi(baseUrl: string): UseWalletsApiResponse {
	const walletsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/wallets`
	});

	const restWalletsClient = useMemo<IWalletsRESTApiClient>(() => {
		return new WalletsDjangoRESTApiClient(walletsAxiosInstance);
	}, [walletsAxiosInstance]);

	return useMemo(() => ({
		rest: restWalletsClient
	}), [restWalletsClient]);
}

export { useWalletsApi };
