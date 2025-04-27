import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {useApiContext} from "@app/api";
import {listAllWallets, ListAllWalletsResponse} from "@feature/wallet";
import {Wallet} from "@entity/wallet";
import {useMemo} from "react";

interface UseWalletsReturn {
	wallets: Wallet[];
	query: UseQueryResult<ListAllWalletsResponse, Error>
}

const useWallets = (): UseWalletsReturn => {
	const apiContext = useApiContext();
	const query = useQuery({
		queryKey: ['wallets'],
		queryFn: () => listAllWallets({
			handler: apiContext.walletsClients.rest
		})
	});

	return useMemo(() => ({
		wallets: query?.data?.data || [],
		query
	}), []);
}

export { useWallets };