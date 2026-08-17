import { useMemo } from "react";
import { useAxiosInstance } from "@internal/shared";

import { WalletsMockRESTApiClient } from "@feature/wallets";
import { API_BASE_PATH } from "../config.ts";
import type { IWalletsRESTApiClient } from "@feature/wallets";

interface UseWalletsApiResponse {
	rest: IWalletsRESTApiClient;
}

function useWalletsApi(baseUrl: string): UseWalletsApiResponse {
	const walletsAxiosInstance = useAxiosInstance({
		baseUrl: `${baseUrl}${API_BASE_PATH}/wallets`
	});

	const restWalletsClient = useMemo<IWalletsRESTApiClient>(() => {
		return new WalletsMockRESTApiClient();
	}, [walletsAxiosInstance]);

	return useMemo(() => ({
		rest: restWalletsClient
	}), [restWalletsClient]);
}

export { useWalletsApi };
export type { UseWalletsApiResponse };
