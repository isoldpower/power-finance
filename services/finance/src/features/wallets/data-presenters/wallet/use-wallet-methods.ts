import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import {
	deleteWallet as deleteWalletApi,
	fetchWallet as fetchWalletApi,
	updateWallet as updateWalletApi,
} from "../../wallets-api";
import { WALLETS_CACHE_KEYS } from "../cache-config.ts";
import { useOptimisticWallets } from "./optimistic";

import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { WalletPatch } from "@entity/wallets";
import type {
	DeleteWalletResponse,
	FetchWalletResponse,
	UpdateWalletResponse,
} from "../../wallets-api";
import type { WalletCachesSnapshot } from "./optimistic";


interface UseWalletMethodsReturn {
	meta: {
		updateMutation: UseMutationResult<UpdateWalletResponse, Error, WalletPatch, WalletCachesSnapshot>;
		deleteMutation: UseMutationResult<DeleteWalletResponse, Error, string, WalletCachesSnapshot>;
		query: UseQueryResult<FetchWalletResponse>;
	}
	updateWallet: (patch: WalletPatch) => Promise<UpdateWalletResponse>;
	deleteWallet: () => Promise<DeleteWalletResponse>;
	fetchWallet: () => void;
}

const useWalletMethods = (
	id: string
): UseWalletMethodsReturn => {
	const apiContext = useApiContext();
	const client = useQueryClient();
	const optimistic = useOptimisticWallets();

	const invalidateWallets = useCallback(() => {
		for (const key of DERIVED_KEYS.onWalletChange) {
			void client.invalidateQueries({ queryKey: [key] });
		}
	}, [client]);

	const singleQuery = useQuery({
		queryKey: [WALLETS_CACHE_KEYS.fetch, id],
		enabled: id !== '',
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		queryFn: () => fetchWalletApi({
			id,
			handler: apiContext.walletServers.rest
		})
	});

	const updateMutation = useMutation<UpdateWalletResponse, Error, WalletPatch, WalletCachesSnapshot>({
		mutationFn: (patch: WalletPatch) => updateWalletApi({
			id,
			patch,
			handler: apiContext.walletServers.rest
		}),
		mutationKey: [WALLETS_CACHE_KEYS.update, id],
		onMutate: async (patch: WalletPatch) => {
			const snapshot = await optimistic.capture();
			optimistic.applyPatch(id, patch);

			return snapshot;
		},
		onError: (_error, _patch, snapshot) => {
			optimistic.restore(snapshot);
		},
		onSuccess: (wallet) => {
			optimistic.applySettled(id, wallet);
		},
		onSettled: invalidateWallets
	});

	const deleteMutation = useMutation<DeleteWalletResponse, Error, string, WalletCachesSnapshot>({
		mutationFn: (walletId: string) => deleteWalletApi({
			id: walletId,
			handler: apiContext.walletServers.rest
		}),
		mutationKey: [WALLETS_CACHE_KEYS.delete, id],
		onMutate: async (walletId: string) => {
			const snapshot = await optimistic.capture();
			optimistic.applyRemove(walletId, new Date().toISOString());

			return snapshot;
		},
		onError: (_error, _walletId, snapshot) => {
			optimistic.restore(snapshot);
		},
		onSettled: invalidateWallets
	});

	const fetchWallet = useCallback(() => {
		return singleQuery.refetch();
	}, [singleQuery]);

	const updateWallet = useCallback((patch: WalletPatch) => {
		return updateMutation.mutateAsync(patch);
	}, [updateMutation]);

	const deleteWallet = useCallback(() => {
		return deleteMutation.mutateAsync(id);
	}, [deleteMutation, id]);

	const meta = useMemo(() => ({
		updateMutation,
		deleteMutation,
		query: singleQuery
	}), [singleQuery, updateMutation, deleteMutation]);

	return useMemo(() => ({
		meta,
		updateWallet,
		deleteWallet,
		fetchWallet,
	}), [meta, fetchWallet, updateWallet, deleteWallet]);
};

export { useWalletMethods };
export type { UseWalletMethodsReturn };
