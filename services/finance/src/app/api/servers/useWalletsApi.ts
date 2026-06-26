import { useMemo } from "react";
import { IWalletsRESTApiClient, WalletsDjangoRESTApiClient, WalletsMockRESTApiClient } from "@feature/wallet";
import { useAxiosInstance } from "@internal/shared";

const USE_DJANGO_BACKEND: boolean = false;

interface UseWalletsApiResponse {
	rest: IWalletsRESTApiClient;
}

function useWalletsApi(baseUrl: string): UseWalletsApiResponse {
	const walletsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}/wallets`
	});

	const restWalletsClient = useMemo<IWalletsRESTApiClient>(() => {
		return USE_DJANGO_BACKEND
			? new WalletsDjangoRESTApiClient(walletsAxiosInstance)
			: new WalletsMockRESTApiClient('wallets');
	}, [walletsAxiosInstance]);

	return useMemo(() => ({
		rest: restWalletsClient
	}), [restWalletsClient]);
}

export { useWalletsApi };
