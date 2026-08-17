import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

import { useApiContext, DERIVED_KEYS } from "@app/api";
import { updateWallet as updateWalletApi } from "../../wallets-api";
import { WALLETS_CACHE_KEYS } from "../cache-config.ts";
import type { QueryKey } from "@tanstack/react-query";
import type { Wallet } from "@entity/wallets";
import type { ListWalletsResponse } from "../../wallets-api";

interface FavoriteInput {
	id: string;
	favorite: boolean;
}

interface FavoriteSnapshot {
	previous: [QueryKey, ListWalletsResponse | undefined][];
}

interface UseWalletFavoriteReturn {
	toggleFavorite: (wallet: Wallet) => void;
	isPending: boolean;
}

const PAGED_KEYS = [WALLETS_CACHE_KEYS.list, WALLETS_CACHE_KEYS.search];

const useWalletFavorite = (): UseWalletFavoriteReturn => {
	const apiContext = useApiContext();
	const client = useQueryClient();

	const mutation = useMutation<Wallet, Error, FavoriteInput, FavoriteSnapshot>({
		mutationKey: [WALLETS_CACHE_KEYS.update],
		mutationFn: (input: FavoriteInput) => updateWalletApi({
			id: input.id,
			patch: { favorite: input.favorite },
			handler: apiContext.walletServers.rest,
		}),
		onMutate: async (input: FavoriteInput) => {
			await Promise.all(PAGED_KEYS.map((key) => client.cancelQueries({ queryKey: [key] })));

			const previous = PAGED_KEYS.flatMap((key) => (
				client.getQueriesData<ListWalletsResponse>({ queryKey: [key] })
			));

			for (const key of PAGED_KEYS) {
				client.setQueriesData<ListWalletsResponse>({ queryKey: [key] }, (response) => {
					if (!response) return response;

					return {
						page: {
							...response.page,
							items: response.page.items.map((wallet) => (
								wallet.id === input.id ? { ...wallet, favorite: input.favorite } : wallet
							)),
						},
					};
				});
			}

			return { previous };
		},
		onError: (_error, _input, context) => {
			for (const [key, snapshot] of context?.previous ?? []) {
				client.setQueryData(key, snapshot);
			}
		},
		onSettled: () => {
			for (const key of DERIVED_KEYS.onWalletChange) {
				void client.invalidateQueries({ queryKey: [key] });
			}
		},
	});

	const toggleFavorite = useCallback((wallet: Wallet) => {
		mutation.mutate({ id: wallet.id, favorite: !wallet.favorite });
	}, [mutation]);

	return useMemo(() => ({
		toggleFavorite,
		isPending: mutation.isPending,
	}), [toggleFavorite, mutation.isPending]);
};

export { useWalletFavorite };
export type { UseWalletFavoriteReturn };
