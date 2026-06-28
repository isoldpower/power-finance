import { useMemo } from "react";

import { useWalletsList } from "@feature/wallet";
import { walletToGoal } from "../model.ts";
import type { Goal } from "../model.ts";

interface UseGoalsReturn {
	goals: Goal[];
	isPending: boolean;
	isError: boolean;
}

const useGoals = (): UseGoalsReturn => {
	const { wallets, isPending, isError } = useWalletsList(undefined, 'long-term-goal');

	const goals = useMemo(() => wallets.map(walletToGoal), [wallets]);

	return { goals, isPending, isError };
};

export { useGoals };
export type { UseGoalsReturn };
