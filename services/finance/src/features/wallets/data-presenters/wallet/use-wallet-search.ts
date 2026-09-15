import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { searchWallets as searchWalletsApi } from "../../wallets-api";
import { WALLETS_CACHE_KEYS } from "../cache-config.ts";

import type { PageParams } from "@shared/api";
import type { WalletQuery } from "@entity/wallets";


type UseWalletSearchParams = PageParams;

const useWalletSearch = (query: WalletQuery, params?: UseWalletSearchParams) => {
	const apiContext = useApiContext();

	const searchQuery = useQuery({
		queryFn: () => searchWalletsApi({
			query,
			page: { limit: params?.limit, cursor: params?.cursor },
			handler: apiContext.walletServers.rest
		}),
		queryKey: [
			WALLETS_CACHE_KEYS.search,
			query,
			params?.limit ?? 'default',
			params?.cursor ?? 'first',
		],
	});

	return useMemo(() => ({
		...searchQuery,
		wallets: searchQuery.data?.page.items ?? [],
		total: searchQuery.data?.page.total ?? 0,
		nextCursor: searchQuery.data?.page.nextCursor ?? null,
		prevCursor: searchQuery.data?.page.prevCursor ?? null,
	}), [searchQuery]);
};

export { useWalletSearch };
export type { UseWalletSearchParams };
