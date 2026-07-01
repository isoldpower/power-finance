import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiContext } from "@app/api";
import { deleteWallet } from "../wallets-api";
import { GOALS_CACHE_KEYS } from "./cache-config.ts";

const useDeleteGoal = () => {
	const apiContext = useApiContext();
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [GOALS_CACHE_KEYS.delete],
		mutationFn: (id: string) => deleteWallet({
			handler: apiContext.walletServers.rest,
			id,
		}),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: [GOALS_CACHE_KEYS.wallets] });
		},
	});
};

export { useDeleteGoal };
