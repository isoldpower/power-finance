import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { fetchWallet } from "../../wallets-api";
import { WALLET_RECENT_LIMIT, WALLETS_CACHE_KEYS } from "../cache-config.ts";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { Transaction } from "@entity/transactions";
import type { WalletDetails } from "@entity/wallets";
import type { FetchWalletResponse } from "../../wallets-api";


type UseWalletOptions = Omit<UseQueryOptions<FetchWalletResponse>, 'queryKey' | 'queryFn'> & object;

type UseWalletReturn = UseQueryResult<FetchWalletResponse> & {
	wallet: WalletDetails | undefined;
	recent: Transaction[];
};

const EMPTY_RECENT: Transaction[] = [];

const useWallet = (
	id: string,
	options?: UseWalletOptions
): UseWalletReturn => {
	const apiContext = useApiContext();
	const query = useQuery<FetchWalletResponse>({
		queryKey: [WALLETS_CACHE_KEYS.fetch, id],
		queryFn: () => fetchWallet({
			id,
			handler: apiContext.walletServers.rest,
			page: { limit: WALLET_RECENT_LIMIT },
		}),
		...options ?? {}
	});

	return useMemo(() => ({
		...query,
		wallet: query.data?.wallet,
		recent: query.data?.recent.items ?? EMPTY_RECENT,
	}), [query]);
};

export { useWallet };
export type { UseWalletReturn, UseWalletOptions };
