import type { QueryReaction } from "./use-query-reactions.ts";
import { useWalletsListMethods } from "@feature/wallet";
import { useCallback } from "react";

const useTransactionPostReaction = (): QueryReaction => {
	const { fetchAllWallets } = useWalletsListMethods();

	const refetchWallets = () => {
		fetchAllWallets();
	}

	const compare = useCallback((keys: string[]) => {
		return keys.includes('transactions') ||
			keys.includes('transaction');
	}, []);

	return {
		compare,
		reaction: refetchWallets,
	} satisfies QueryReaction;
}

export { useTransactionPostReaction };