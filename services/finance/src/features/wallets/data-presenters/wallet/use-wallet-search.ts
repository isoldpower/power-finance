import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { stringifySorted } from "@shared/data";
import { WALLETS_CACHE_KEYS } from "../cache-config.ts";
import { searchWallets as searchWalletsApi } from "../../wallets-api/methods/search-wallets.ts";
import type { WalletSearchRoot } from "../../wallets-api/types.ts";

import { useMemo } from "react";


const useWalletSearch = (search: WalletSearchRoot) => {
	const apiContext = useApiContext();
	
	const searchQuery = useQuery({
		queryFn: () => searchWalletsApi({
			payload: { data: search },
			handler: apiContext.walletServers.rest
		}),
		queryKey: [WALLETS_CACHE_KEYS.search, stringifySorted(search)],
	});
	
	return useMemo(() => ({
		...searchQuery,
		wallets: (searchQuery.data?.data ?? []),
		total: (searchQuery.data?.meta.total ?? 0)
	}), [searchQuery]);
}

export { useWalletSearch };