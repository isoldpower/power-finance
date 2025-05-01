import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { fetchWallet } from "@feature/wallet";
import { useApiContext } from "@app/api";
import { CACHE_KEYS } from "./config.ts";
import type { Wallet } from "@entity/wallet";
import type { FetchWalletResponse } from "@feature/wallet";

type UseWalletOptions = Omit<UseQueryOptions<FetchWalletResponse>, 'queryKey' | 'queryFn'> & {};

type UseWalletReturn = UseQueryResult & {
	wallet: Wallet | undefined;
}

const useWallet = (
	id: string,
	options?: UseWalletOptions
): UseWalletReturn  => {
	const apiContext = useApiContext();
	const query = useQuery<FetchWalletResponse>({
		queryKey: [CACHE_KEYS.fetch, id],
		queryFn: () => fetchWallet({
			payload: { id },
			handler: apiContext.walletsClients.rest
		}),
		...options ?? {}
	});

	return useMemo(() => ({
		...query,
		wallet: query?.data
	}), [query]);
}

export { useWallet };
export type { UseWalletReturn, UseWalletOptions };