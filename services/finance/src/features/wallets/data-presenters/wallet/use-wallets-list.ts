import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "@app/api";
import { listWallets } from "../../wallets-api";
import { WALLETS_CACHE_KEYS } from "../cache-config.ts";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { PageParams } from "@shared/api";
import type { Wallet } from "@entity/wallets";
import type { ListWalletsResponse } from "../../wallets-api";


type UseWalletsListOptions = Omit<UseQueryOptions<ListWalletsResponse>, 'queryKey' | 'queryFn'> & object;

type UseWalletsListReturn = UseQueryResult<ListWalletsResponse> & {
	wallets: Wallet[];
	total: number;
	nextCursor: string | null;
	prevCursor: string | null;
};

const EMPTY_WALLETS: Wallet[] = [];

const useWalletsList = (
	options?: UseWalletsListOptions,
	page?: PageParams
): UseWalletsListReturn => {
	const apiContext = useApiContext();
	const query = useQuery<ListWalletsResponse>({
		queryKey: [WALLETS_CACHE_KEYS.list, page?.limit ?? 'default', page?.cursor ?? 'first'],
		queryFn: () => listWallets({
			handler: apiContext.walletServers.rest,
			page,
		}),
		...options ?? {}
	});

	return useMemo(() => ({
		...query,
		wallets: query.data?.page.items ?? EMPTY_WALLETS,
		total: query.data?.page.total ?? 0,
		nextCursor: query.data?.page.nextCursor ?? null,
		prevCursor: query.data?.page.prevCursor ?? null,
	}), [query]);
};

export { useWalletsList };
export type { UseWalletsListReturn, UseWalletsListOptions };
