import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback , useMemo } from "react";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import {
	deleteWallet as deleteWalletApi,
	fetchWallet as fetchWalletApi,
	updateWallet as updateWalletApi,
	replaceWallet as replaceWalletApi
} from "@feature/wallet";
import { useApiContext } from "@app/api";
import { CACHE_KEYS } from "./config.ts";
import type {
	FetchWalletResponse, WalletValuableFields,
	DeleteWalletRequest, DeleteWalletResponse,
	ReplaceWalletRequest, ReplaceWalletResponse,
	UpdateWalletRequest, UpdateWalletResponse,
	ListAllWalletsResponse
} from "@feature/wallet";


interface UseWalletReturn {
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
		queryKey: [CACHE_KEYS.fetch, id],
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

		client.setQueryData([CACHE_KEYS.list], (oldData: ListAllWalletsResponse | undefined) => {
			if (!oldData) return [];

			return {
				data: oldData.data.map((wallet) => wallet.id === data.id ? data : wallet),
				meta: oldData.meta
			};
		})
	}, [client]);

	const filterList = useCallback((
		data: FetchWalletResponse | undefined
	) => {
		if (!data) return;

		client.setQueryData([CACHE_KEYS.list], (oldData: ListAllWalletsResponse | undefined) => {
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
		mutationKey: [CACHE_KEYS.update, id],
		onSettled: () => singleQuery.refetch()
			.then(({ data }) => { synchronizeList(data); })
	});

	const deleteMutation = useMutation({
		mutationFn: (id: DeleteWalletRequest['id']) => deleteWalletApi({
			id,
			handler: apiContext.walletsClients.rest
		}),
		mutationKey: [CACHE_KEYS.delete, id],
		onSettled: () => { filterList(singleQuery.data); }
	});

	const replaceMutation = useMutation({
		mutationFn: (data: ReplaceWalletRequest['payload']) => replaceWalletApi({
			payload: data,
			handler: apiContext.walletsClients.rest
		}),
		mutationKey: [CACHE_KEYS.replace, id],
		onSettled: () => singleQuery.refetch()
			.then(({ data }) => { synchronizeList(data); })
	});

	const fetchWallet = useCallback(() => {
		return singleQuery.refetch();
	}, [singleQuery]);

	const updateWallet = useCallback((
		data: WalletValuableFields
	) => {
		updateMutation.mutate({ id, data });
	}, [id, updateMutation]);

	const deleteWallet = useCallback(() => {
		deleteMutation.mutate(id);
	}, [deleteMutation, id]);

	const replaceWallet = useCallback((
		data: WalletValuableFields
	) => {
		const indexedData = Object.assign(data, { id });

		replaceMutation.mutate({ id, data: indexedData });
	}, [id, replaceMutation]);

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