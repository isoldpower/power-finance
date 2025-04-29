import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { WALLETS_LIST_KEY } from "./config.ts";
import {
	createWallet as createWalletApi,
	listAllWallets as listAllWalletsApi
} from "@feature/wallet";
import type { CreateWalletRequest, CreateWalletResponse, WalletValuableFields } from "@feature/wallet";

type UseWalletsReturn = {
	meta: {
		query: UseQueryResult<void, Error>;
		createMutation: UseMutationResult<CreateWalletResponse, Error, CreateWalletRequest['payload']>;
	}
	createWallet: (data: WalletValuableFields) => void;
	fetchAllWallets: () => void;
}

const useWalletsListMethods = (): UseWalletsReturn => {
	const apiContext = useApiContext();
	const client = useQueryClient();

	const query = useQuery({
		queryKey: [WALLETS_LIST_KEY],
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		queryFn: () => listAllWalletsApi({
			handler: apiContext.walletsClients.rest
		}),
		select: (data) => {
			data.data.forEach((wallet) => {
				client.setQueryData([WALLETS_LIST_KEY, wallet.id], wallet);
			})
		}
	});

	const createMutation = useMutation({
		mutationFn: (data: CreateWalletRequest['payload']) => createWalletApi({
			payload: data,
			handler: apiContext.walletsClients.rest
		}),
		mutationKey: ['createWallet'],
		onSettled: () => query.refetch()
	});

	const createWallet = useCallback((
		data: WalletValuableFields
	) => {
		return createMutation.mutate({ data })
	}, [createMutation.mutate]);

	const fetchAllWallets = useCallback(() => {
		return query.refetch();
	}, []);

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