import type { MutationCompareArgument, MutationReaction } from "./use-query-reactions.ts";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { TRANSACTIONS_QUERY_KEYS } from "@feature/transactions";


const useWalletDeleteReaction = (): MutationReaction => {
	const client = useQueryClient();

	const refetchTransactions = useCallback(() => {
		void client.invalidateQueries({ queryKey: [TRANSACTIONS_QUERY_KEYS.list] });
		void client.invalidateQueries({ queryKey: [TRANSACTIONS_QUERY_KEYS.search] });
	}, [client]);

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
