import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import { useApiContext, DERIVED_KEYS } from "@app/api";
import { createWallet as createWalletApi, listWallets as listWalletsApi } from "../../wallets-api";
import { WALLETS_CACHE_KEYS } from "../cache-config.ts";
import type { WalletDraft } from "@entity/wallets";
import type { CreateWalletResponse, ListWalletsResponse } from "../../wallets-api";

interface UseWalletsReturn {
	meta: {
		query: UseQueryResult<ListWalletsResponse>;
		createMutation: UseMutationResult<CreateWalletResponse, Error, WalletDraft>;
	}
	createWallet: (draft: WalletDraft) => void;
	fetchAllWallets: () => void;
}

const useWalletsListMethods = (): UseWalletsReturn => {
	const apiContext = useApiContext();
	const client = useQueryClient();

	const query = useQuery({
		queryKey: [WALLETS_CACHE_KEYS.list, 'default', 'first'],
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		queryFn: () => listWalletsApi({
			handler: apiContext.walletServers.rest
		})
	});

	const createMutation = useMutation({
		mutationFn: (draft: WalletDraft) => createWalletApi({
			draft,
			handler: apiContext.walletServers.rest
		}),
		mutationKey: [WALLETS_CACHE_KEYS.create],
		onSettled: () => {
			for (const key of DERIVED_KEYS.onWalletChange) {
				void client.invalidateQueries({ queryKey: [key] });
			}
		}
	});

	const createWallet = useCallback((
		draft: WalletDraft
	) => {
		createMutation.mutate(draft);
	}, [createMutation]);

	const fetchAllWallets = useCallback(() => {
		return query.refetch();
	}, [query]);

	const meta = useMemo(() => ({
		createMutation,
		query
	}), [createMutation, query]);

	return useMemo(() => ({
		createWallet,
		fetchAllWallets,
		meta
	}), [meta, createWallet, fetchAllWallets]);
};

export { useWalletsListMethods };
export type { UseWalletsReturn };
