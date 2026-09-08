import { useMemo } from "react";

import { WalletsHttpRESTApiClient, WalletsMockRESTApiClient } from "@feature/wallets";
import { useResourceAxios } from "./use-resource-axios.ts";

import type { IWalletsRESTApiClient } from "@feature/wallets";
import type { ApiServerOptions } from "./types.ts";


const WALLETS_PATH = '/wallets';

interface UseWalletsApiResponse {
	rest: IWalletsRESTApiClient;
}

function useWalletsApi(options: ApiServerOptions): UseWalletsApiResponse {
	const axiosInstance = useResourceAxios(options, WALLETS_PATH);

	const restClient = useMemo<IWalletsRESTApiClient>(() => {
		return options.mode === 'live'
			? new WalletsHttpRESTApiClient(axiosInstance, options.versions)
			: new WalletsMockRESTApiClient();
	}, [axiosInstance, options.mode, options.versions]);

	return useMemo(() => ({
		rest: restClient
	}), [restClient]);
}

export { useWalletsApi };
export type { UseWalletsApiResponse };
