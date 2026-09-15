import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useApiContext, DERIVED_KEYS } from "@app/api";
import {
	createWallet as createWalletApi,
	listWallets as listWalletsApi,
} from "../../wallets-api";
import { WALLETS_CACHE_KEYS } from "../cache-config.ts";
import { optimisticWalletId, useOptimisticWallets, walletFromDraft } from "./optimistic";

import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { WalletDraft } from "@entity/wallets";
import type { CreateWalletResponse, ListWalletsResponse } from "../../wallets-api";
import type { WalletCachesSnapshot } from "./optimistic";


interface CreateWalletContext {
	snapshot: WalletCachesSnapshot;
	temporaryId: string;
}

interface UseWalletsReturn {
	meta: {
		query: UseQueryResult<ListWalletsResponse>;
		createMutation: UseMutationResult<CreateWalletResponse, Error, WalletDraft, CreateWalletContext>;
	}
	createWallet: (draft: WalletDraft) => void;
	fetchAllWallets: () => void;
}

const useWalletsListMethods = (): UseWalletsReturn => {
	const apiContext = useApiContext();
	const client = useQueryClient();
	const optimistic = useOptimisticWallets();

	const query = useQuery({
		queryKey: [WALLETS_CACHE_KEYS.list, 'default', 'first'],
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		queryFn: () => listWalletsApi({
			handler: apiContext.walletServers.rest
		})
	});

	const createMutation = useMutation<CreateWalletResponse, Error, WalletDraft, CreateWalletContext>({
		mutationFn: (draft: WalletDraft) => createWalletApi({
			draft,
			handler: apiContext.walletServers.rest
		}),
		mutationKey: [WALLETS_CACHE_KEYS.create],
		onMutate: async (draft: WalletDraft) => {
			const snapshot = await optimistic.capture();
			const temporaryId = optimisticWalletId();
			optimistic.applyCreate(walletFromDraft(draft, temporaryId, new Date().toISOString()));

			return { snapshot, temporaryId };
		},
		onError: (_error, _draft, context) => {
			optimistic.restore(context?.snapshot);
		},
		onSuccess: (response, _draft, context) => {
			optimistic.applySettled(context.temporaryId, response.wallet);
		},
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
export type { CreateWalletContext, UseWalletsReturn };
