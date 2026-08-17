import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import { useApiContext, DERIVED_KEYS } from "@app/api";
import {
	deleteWallet as deleteWalletApi,
	fetchWallet as fetchWalletApi,
	updateWallet as updateWalletApi,
} from "../../wallets-api";
import { WALLETS_CACHE_KEYS } from "../cache-config.ts";
import type { WalletPatch } from "@entity/wallets";
import type {
	DeleteWalletResponse,
	FetchWalletResponse,
	UpdateWalletResponse,
} from "../../wallets-api";

interface UseWalletMethodsReturn {
	meta: {
		updateMutation: UseMutationResult<UpdateWalletResponse, Error, WalletPatch>;
		deleteMutation: UseMutationResult<DeleteWalletResponse, Error, string>;
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

	const updateMutation = useMutation({
		mutationFn: (patch: WalletPatch) => updateWalletApi({
			id,
			patch,
			handler: apiContext.walletServers.rest
		}),
		mutationKey: [WALLETS_CACHE_KEYS.update, id],
		onSettled: invalidateWallets
	});

	const deleteMutation = useMutation({
		mutationFn: (walletId: string) => deleteWalletApi({
			id: walletId,
			handler: apiContext.walletServers.rest
		}),
		mutationKey: [WALLETS_CACHE_KEYS.delete, id],
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
