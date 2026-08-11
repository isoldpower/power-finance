import { useMemo } from "react";
import { IWalletsRESTApiClient, WalletsMockRESTApiClient } from "@feature/wallets";
import { useAxiosInstance } from "@internal/shared";


interface UseWalletsApiResponse {
	rest: IWalletsRESTApiClient;
}

function useWalletsApi(baseUrl: string): UseWalletsApiResponse {
	const walletsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/wallets`
	});

	const restWalletsClient = useMemo<IWalletsRESTApiClient>(() => {
		return new WalletsMockRESTApiClient('wallets');
	}, [walletsAxiosInstance]);

	return useMemo(() => ({
		rest: restWalletsClient
	}), [restWalletsClient]);
}

export { useWalletsApi };
