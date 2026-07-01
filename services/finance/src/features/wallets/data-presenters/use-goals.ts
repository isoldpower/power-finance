import { useMemo } from "react";

import { useWalletsList } from "./use-wallets-list.ts";
import { walletToGoal } from "../wallets-api";
import type { Goal } from "../wallets-api";


interface UseGoalsReturn {
	goals: Goal[];
	isPending: boolean;
	isError: boolean;
}

const useGoals = (): UseGoalsReturn => {
	const { wallets, isPending, isError } = useWalletsList(undefined, 'long-term-goal');

	const goals = useMemo(() => {
		return wallets.map(walletToGoal);
	}, [wallets]);

	return { goals, isPending, isError };
};

export { useGoals };
export type { UseGoalsReturn };
