import {useMutation, useQuery, UseQueryResult} from "@tanstack/react-query";
import {
	deleteWallet as deleteWalletApi,
	DeleteWalletRequest,
	fetchWallet, FetchWalletResponse, listAllWallets,
	updateWallet as updateWalletApi,
	UpdateWalletRequest, WalletValuableFields
} from "@feature/wallet";
import {useApiContext} from "@app/api";
import {useCallback, useMemo} from "react";

interface UseWalletReturn {
	methods: {
		updateWallet: (data: WalletValuableFields) => void;
		deleteWallet: () => void;
	};
	query: UseQueryResult<FetchWalletResponse>
}

const useWallet = (
	id: string
): UseWalletReturn => {
	const apiContext = useApiContext();
	const singleQuery = useQuery({
		queryKey: ['wallet', id],
		queryFn: () => fetchWallet({
			payload: { id },
			handler: apiContext.walletsClients.rest
		})
	});
	const listQuery = useQuery({
		queryKey: ['wallets'],
		queryFn: () => listAllWallets({
			handler: apiContext.walletsClients.rest
		})
	});

	const refetchQueries = useCallback(() => {
		listQuery.refetch();
		singleQuery.refetch();
	}, [listQuery.refetch, singleQuery.refetch]);

	const updateMutation = useMutation({
		mutationFn: (data: UpdateWalletRequest['payload']) => updateWalletApi({
			payload: data,
			handler: apiContext.walletsClients.rest
		}),
		mutationKey: ['updateWallet'],
		onSettled: refetchQueries
	});
	const deleteMutation = useMutation({
		mutationFn: (id: DeleteWalletRequest['id']) => deleteWalletApi({
			id,
			handler: apiContext.walletsClients.rest
		}),
		mutationKey: ['updateWallet'],
		onSettled: refetchQueries
	});

	const updateWallet = useCallback((
		data: WalletValuableFields
	) => {
		return updateMutation.mutate({ id, data })
	}, [id, updateMutation.mutate]);

	const deleteWallet = useCallback(() => {
		return deleteMutation.mutate(id);
	}, [id, deleteMutation.mutate]);

	return useMemo(() => ({
		query: singleQuery,
		methods: {
			updateWallet,
			deleteWallet
		}
	}), [singleQuery, updateWallet, deleteWallet]);
}

export { useWallet };