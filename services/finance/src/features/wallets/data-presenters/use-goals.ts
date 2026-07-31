import { useMemo } from "react";

import { isGoalWallet } from "@entity/wallets";
import { useWalletsList } from "./use-wallets-list.ts";

import type { GoalWallet } from "@entity/wallets";


interface UseGoalsReturn {
	goals: GoalWallet[];
	isPending: boolean;
	isError: boolean;
}

const useGoals = (): UseGoalsReturn => {
	const { wallets, isPending, isError } = useWalletsList(undefined, 'long-term-goal');

	const goals = useMemo(() => wallets.filter(isGoalWallet), [wallets]);

	return { goals, isPending, isError };
};

export { useGoals };
export type { UseGoalsReturn };
