import type { MutationCompareArgument, MutationReaction } from "./use-query-reactions.ts";
import { useWalletsListMethods } from "@feature/wallets";
import { useCallback } from "react";


const useTransactionPostReaction = (): MutationReaction => {
	const { fetchAllWallets } = useWalletsListMethods();

	const refetchWallets = () => {
		fetchAllWallets();
	}

	const compare = useCallback((event: MutationCompareArgument) => {
		const keys = event.mutation?.options.mutationKey as string | string[] | undefined;
		
		return event.type === 'updated' && Array.isArray(keys) && (
			keys.includes('createTransaction')
		);
	}, []);

	return {
		compare,
		reaction: refetchWallets,
	} satisfies MutationReaction;
}

export { useTransactionPostReaction };