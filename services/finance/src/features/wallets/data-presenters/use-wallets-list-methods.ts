import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import {
	createWallet as createWalletApi,
	listAllWallets as listAllWalletsApi
} from "../wallets-api";
import { WALLETS_CACHE_KEYS } from "./cache-config.ts";
import type {
	CreateWalletRequest,
	CreateWalletResponse,
	WalletValuableFields,
	ListAllWalletsResponse
} from "../wallets-api";


interface UseWalletsReturn {
	meta: {
		query: UseQueryResult<ListAllWalletsResponse>;
		createMutation: UseMutationResult<CreateWalletResponse, Error, CreateWalletRequest['payload']>;
	}
	createWallet: (data: WalletValuableFields) => void;
	fetchAllWallets: () => void;
}

const SUMMARY_KEYS = ['summary-insights', 'summary-ledger-balance'];

const useWalletsListMethods = (): UseWalletsReturn => {
	const apiContext = useApiContext();
	const client = useQueryClient();

	const query = useQuery({
		queryKey: [WALLETS_CACHE_KEYS.list],
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		queryFn: () => listAllWalletsApi({
			handler: apiContext.walletServers.rest
		})
	});

	const createMutation = useMutation({
		mutationFn: (data: CreateWalletRequest['payload']) => createWalletApi({
			payload: data,
			handler: apiContext.walletServers.rest
		}),
		mutationKey: [WALLETS_CACHE_KEYS.create],
		onSettled: () => {
			void query.refetch();
			for (const key of SUMMARY_KEYS) {
				void client.invalidateQueries({ queryKey: [key] });
			}
		}
	});

	const createWallet = useCallback((
		data: WalletValuableFields
	) => {
		createMutation.mutate({ data });
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
}

export { useWalletsListMethods };
export type { UseWalletsReturn };