import {useMutation, useQuery, UseQueryResult} from "@tanstack/react-query";
import {useApiContext} from "@app/api";
import {
	createWallet as createWalletApi,
	updateWallet as updateWalletApi,
	deleteWallet as deleteWalletApi,
	CreateWalletRequest,
	listAllWallets,
	ListAllWalletsResponse,
	WalletValuableFields, DeleteWalletRequest
} from "@feature/wallet";
import {Wallet} from "@entity/wallet";
import {useCallback, useMemo} from "react";
import {UpdateWalletRequest} from "@feature/wallet/api-clients/methods/update-wallet.ts";

interface UseWalletsReturn {
	wallets: Wallet[];
	methods: {
		createWallet: (data: WalletValuableFields) => void;
		updateWallet: (id: string, data: WalletValuableFields) => void;
		deleteWallet: (id: string) => void;
	}
	isMutating: boolean;
	query: UseQueryResult<ListAllWalletsResponse, Error>;
}

const useWallets = (): UseWalletsReturn => {
	const apiContext = useApiContext();
	const query = useQuery({
		queryKey: ['wallets'],
		queryFn: () => listAllWallets({
			handler: apiContext.walletsClients.rest
		})
	});
	const createMutation = useMutation({
		mutationFn: (data: CreateWalletRequest['payload']) => createWalletApi({
			payload: data,
			handler: apiContext.walletsClients.rest
		}),
		mutationKey: ['createWallet'],
		onSettled: () => query.refetch()
	});
	const updateMutation = useMutation({
		mutationFn: (data: UpdateWalletRequest['payload']) => updateWalletApi({
			payload: data,
			handler: apiContext.walletsClients.rest
		}),
		mutationKey: ['updateWallet'],
		onSettled: () => query.refetch()
	});
	const deleteMutation = useMutation({
		mutationFn: (id: DeleteWalletRequest['id']) => deleteWalletApi({
			id,
			handler: apiContext.walletsClients.rest
		}),
		mutationKey: ['updateWallet'],
		onSettled: () => query.refetch()
	});

	const createWallet = useCallback((
		data: WalletValuableFields
	) => {
		return createMutation.mutate({ data })
	}, [createMutation.mutate]);

	const updateWallet = useCallback((
		id: string,
		data: WalletValuableFields
	) => {
		return updateMutation.mutate({ id, data })
	}, [updateMutation.mutate]);

	const deleteWallet = useCallback((
		id: string
	) => {
		return deleteMutation.mutate(id);
	}, [deleteMutation.mutate]);

	return useMemo(() => ({
		wallets: query?.data?.data || [],
		methods: {
			createWallet,
			updateWallet,
			deleteWallet
		},
		isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
		query
	}), [query, createWallet, updateWallet, createMutation, updateMutation, deleteMutation]);
}

export { useWallets };