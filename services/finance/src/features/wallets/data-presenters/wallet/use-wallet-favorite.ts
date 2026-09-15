import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import { updateWallet as updateWalletApi } from "../../wallets-api";
import { WALLETS_CACHE_KEYS } from "../cache-config.ts";
import { useOptimisticWallets } from "./optimistic";

import type { Wallet } from "@entity/wallets";
import type { WalletCachesSnapshot } from "./optimistic";


interface FavoriteInput {
	id: string;
	favorite: boolean;
}

interface UseWalletFavoriteReturn {
	toggleFavorite: (wallet: Wallet) => void;
	isPending: boolean;
}

const useWalletFavorite = (): UseWalletFavoriteReturn => {
	const apiContext = useApiContext();
	const client = useQueryClient();
	const optimistic = useOptimisticWallets();

	const mutation = useMutation<Wallet, Error, FavoriteInput, WalletCachesSnapshot>({
		mutationKey: [WALLETS_CACHE_KEYS.update],
		mutationFn: (input: FavoriteInput) => updateWalletApi({
			id: input.id,
			patch: { favorite: input.favorite },
			handler: apiContext.walletServers.rest,
		}),
		onMutate: async (input: FavoriteInput) => {
			const snapshot = await optimistic.capture();
			optimistic.applyPatch(input.id, { favorite: input.favorite });

			return snapshot;
		},
		onError: (_error, _input, snapshot) => {
			optimistic.restore(snapshot);
		},
		onSuccess: (wallet, input) => {
			optimistic.applySettled(input.id, wallet);
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
