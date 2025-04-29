import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { listAllWallets } from "@feature/wallet";
import { useApiContext } from "@app/api";
import { WALLETS_LIST_KEY } from "./config.ts";
import { useMemo } from "react";
import type { Wallet } from "@entity/wallet";
import type { ListAllWalletsResponse } from "@feature/wallet";

type UseWalletsListOptions = Omit<UseQueryOptions<ListAllWalletsResponse>, 'queryKey' | 'queryFn'> & {};

type UseWalletsListReturn = UseQueryResult & {
	wallets: Wallet[];
}

const useWalletsList = (
	options?: UseWalletsListOptions
): UseWalletsListReturn  => {
	const apiContext = useApiContext();
	const query = useQuery<ListAllWalletsResponse>({
		queryKey: [WALLETS_LIST_KEY],
		queryFn: () => listAllWallets({
			handler: apiContext.walletsClients.rest
		}),
		...options ?? {}
	});

	return useMemo(() => ({
		...query,
		wallets: query?.data?.data ?? []
	}), [query]);
}

export { useWalletsList };
export type { UseWalletsListReturn, UseWalletsListOptions };