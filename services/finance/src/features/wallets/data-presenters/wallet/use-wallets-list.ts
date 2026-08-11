import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { listAllWallets } from "../../wallets-api/methods/list-all-wallets.ts";
import { useApiContext } from "@app/api";
import { WALLETS_CACHE_KEYS } from "../cache-config.ts";
import { useMemo } from "react";
import type { Wallet, WalletType } from "@entity/wallets";
import type { ListAllWalletsResponse } from "../../wallets-api/methods/list-all-wallets.ts";


type UseWalletsListOptions = Omit<UseQueryOptions<ListAllWalletsResponse>, 'queryKey' | 'queryFn'> & {};

type UseWalletsListReturn = UseQueryResult & {
	wallets: Wallet[];
}

const walletKind = (wallet: Wallet): WalletType => {
	return wallet.type ?? 'wallet';
};

const useWalletsList = (
	options?: UseWalletsListOptions,
	kind: WalletType = 'wallet'
): UseWalletsListReturn  => {
	const apiContext = useApiContext();
	const query = useQuery<ListAllWalletsResponse>({
		queryKey: [WALLETS_CACHE_KEYS.list],
		queryFn: () => listAllWallets({
			handler: apiContext.walletServers.rest
		}),
		...options ?? {}
	});

	return useMemo(() => ({
		...query,
		wallets: (query.data?.data ?? []).filter((wallet) => {
			return walletKind(wallet) === kind;
		})
	}), [query, kind]);
}

export { useWalletsList };
export type { UseWalletsListReturn, UseWalletsListOptions };
