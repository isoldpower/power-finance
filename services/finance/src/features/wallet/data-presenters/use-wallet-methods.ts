import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	deleteWallet as deleteWalletApi,
	fetchWallet as fetchWalletApi,
	updateWallet as updateWalletApi,
	replaceWallet as replaceWalletApi
} from "@feature/wallet";
import { useApiContext } from "@app/api";
import { useCallback , useMemo } from "react";

import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type {
	FetchWalletResponse, WalletValuableFields,
	DeleteWalletRequest, DeleteWalletResponse,
	ReplaceWalletRequest, ReplaceWalletResponse,
	UpdateWalletRequest, UpdateWalletResponse,
	ListAllWalletsResponse
} from "@feature/wallet";
import { WALLET_KEY, WALLETS_LIST_KEY } from "./config.ts";


type UseWalletReturn = {
	meta: {
		updateMutation: UseMutationResult<UpdateWalletResponse, Error, UpdateWalletRequest['payload']>;
		deleteMutation: UseMutationResult<DeleteWalletResponse, Error, string>;
		replaceMutation: UseMutationResult<ReplaceWalletResponse, Error, ReplaceWalletRequest['payload']>;
		query: UseQueryResult<FetchWalletResponse>;
	}
	updateWallet: (data: WalletValuableFields) => void;
	replaceWallet: (data: WalletValuableFields) => void;
	deleteWallet: () => void;
	fetchWallet: () => void;
}

const useWalletMethods = (
	id: string
): UseWalletReturn => {
	const apiContext = useApiContext();
	const client = useQueryClient();
	const singleQuery = useQuery({
		queryKey: [WALLET_KEY, id],
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		queryFn: () => fetchWalletApi({
			payload: { id },
			handler: apiContext.walletsClients.rest
		})
	});

	const synchronizeList = useCallback((
		data: FetchWalletResponse | undefined
	) => {
		if (!data) return;

		client.setQueryData([WALLETS_LIST_KEY], (oldData: ListAllWalletsResponse | undefined) => {
			if (!oldData) return [];

			return {
				data: oldData.data.map((wallet) => wallet.id === data.id ? data : wallet),
				meta: {
					...oldData.meta,
					total: oldData.meta.total - 1
				}
			};;
		})
	}, [client]);

	const filterList = useCallback((
		data: FetchWalletResponse | undefined
	) => {
		if (!data) return;

		client.setQueryData([WALLETS_LIST_KEY], (oldData: ListAllWalletsResponse | undefined) => {
			if (!oldData) return [];

			return {
				data: oldData.data.filter((wallet) => wallet.id !== data.id),
				meta: {
					...oldData.meta,
					total: oldData.meta.total - 1
				}
			};
		})
	}, [client]);

	const updateMutation = useMutation({
		mutationFn: (data: UpdateWalletRequest['payload']) => updateWalletApi({
			payload: data,
			handler: apiContext.walletsClients.rest
		}),
		mutationKey: ['updateWallet', id],
		onSettled: () => singleQuery.refetch()
			.then(({ data }) => synchronizeList(data))
	});

	const deleteMutation = useMutation({
		mutationFn: (id: DeleteWalletRequest['id']) => deleteWalletApi({
			id,
			handler: apiContext.walletsClients.rest
		}),
		mutationKey: ['deleteWallet', id],
		onSettled: () => filterList(singleQuery.data)
	});

	const replaceMutation = useMutation({
		mutationFn: (data: ReplaceWalletRequest['payload']) => replaceWalletApi({
			payload: data,
			handler: apiContext.walletsClients.rest
		}),
		mutationKey: ['replaceWallet', id],
		onSettled: () => singleQuery.refetch()
			.then(({ data }) => synchronizeList(data))
	});

	const fetchWallet = useCallback(() => {
		return singleQuery.refetch();
	}, [singleQuery.refetch]);

	const updateWallet = useCallback((
		data: WalletValuableFields
	) => {
		return updateMutation.mutate({ id, data })
	}, [id, updateMutation.mutate]);

	const deleteWallet = useCallback(() => {
		return deleteMutation.mutate(id);
	}, [id, deleteMutation.mutate]);

	const replaceWallet = useCallback((
		data: WalletValuableFields
	) => {
		const indexedData = Object.assign(data, { id });

		return replaceMutation.mutate({ id, data: indexedData });
	}, [id, replaceMutation.mutate]);

	const meta = useMemo(() => ({
		updateMutation,
		deleteMutation,
		replaceMutation,
		query: singleQuery
	}), [singleQuery, updateMutation, deleteMutation, replaceMutation]);

	return useMemo(() => ({
		meta,
		updateWallet,
		deleteWallet,
		fetchWallet,
		replaceWallet,
	}), [meta, fetchWallet, replaceWallet, updateWallet, deleteWallet]);
}

export { useWalletMethods };
export type { UseWalletReturn };