import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { fetchWallet } from "../../wallets-api";
import { DEFAULT_WALLET_PERIOD, WALLET_RECENT_LIMIT, WALLETS_CACHE_KEYS } from "../cache-config.ts";
import { walletDetailsPlaceholder } from "./wallet-placeholder.ts";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { Transaction } from "@entity/transactions";
import type { WalletDetails, WalletPeriod } from "@entity/wallets";
import type { FetchWalletResponse } from "../../wallets-api";


type UseWalletOptions = Omit<UseQueryOptions<FetchWalletResponse>, 'queryKey' | 'queryFn'> & object;

type UseWalletReturn = UseQueryResult<FetchWalletResponse> & {
	wallet: WalletDetails | undefined;
	recent: Transaction[];
	period: WalletPeriod;
};

const EMPTY_RECENT: Transaction[] = [];

const useWallet = (
	id: string,
	options?: UseWalletOptions
): UseWalletReturn => {
	const apiContext = useApiContext();
	const client = useQueryClient();
	const placeholderData = useMemo(
		() => walletDetailsPlaceholder(client, id),
		[client, id]
	);
	const query = useQuery<FetchWalletResponse>({
		queryKey: [WALLETS_CACHE_KEYS.fetch, id],
		queryFn: () => fetchWallet({
			id,
			handler: apiContext.walletServers.rest,
			page: { limit: WALLET_RECENT_LIMIT },
		}),
		placeholderData,
		...options ?? {}
	});

	return useMemo(() => ({
		...query,
		wallet: query.data?.wallet,
		recent: query.data?.recent.items ?? EMPTY_RECENT,
		period: query.data?.period ?? DEFAULT_WALLET_PERIOD,
	}), [query]);
};

export { useWallet };
export type { UseWalletReturn, UseWalletOptions };
