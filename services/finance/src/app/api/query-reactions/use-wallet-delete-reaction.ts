import type { MutationCompareArgument, MutationReaction } from "./use-query-reactions.ts";
import { useCallback } from "react";
import { useTransactionsListMethods } from "@feature/transactions";


const useWalletDeleteReaction = (): MutationReaction => {
	const { fetchAllTransactions } = useTransactionsListMethods();

	const refetchTransactions = () => {
		fetchAllTransactions();
	};

	const compare = useCallback((event: MutationCompareArgument) => {
		const keys = event.mutation?.options.mutationKey as string | string[] | undefined;
		
		return event.type === 'updated' && Array.isArray(keys) && (
			keys.includes('deleteWallet')
		);
	}, []);

	return {
		compare,
		reaction: refetchTransactions,
	} satisfies MutationReaction;
}

export { useWalletDeleteReaction };