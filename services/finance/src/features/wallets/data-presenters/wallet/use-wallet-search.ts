import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { stringifySorted } from "@shared/data";
import { searchWallets as searchWalletsApi } from "../../wallets-api";
import { WALLETS_CACHE_KEYS } from "../cache-config.ts";

import type { PageParams, SearchOrder } from "@shared/api";
import type { WalletQuery } from "@entity/wallets";


interface UseWalletSearchParams extends PageParams {
	order?: SearchOrder;
}

const useWalletSearch = (query: WalletQuery, params?: UseWalletSearchParams) => {
	const apiContext = useApiContext();

	const searchQuery = useQuery({
		queryFn: () => searchWalletsApi({
			query,
			order: params?.order,
			page: { limit: params?.limit, cursor: params?.cursor },
			handler: apiContext.walletServers.rest
		}),
		queryKey: [
			WALLETS_CACHE_KEYS.search,
			stringifySorted(query),
			params?.order ?? 'DESC',
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
