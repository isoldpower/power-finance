import {useQuery} from "@tanstack/react-query";
import {fetchWallet} from "@feature/wallet";
import {useApiContext} from "@app/api";

const useWallet = (id: string) => {
	const apiContext = useApiContext();
	const query = useQuery({
		queryKey: ['wallet', id],
		queryFn: ({ queryKey }) => fetchWallet({
			payload: { id: queryKey[1] as string },
			handler: apiContext.walletsClients.rest
		})
	});

	return {
		query
	}
}

export { useWallet };