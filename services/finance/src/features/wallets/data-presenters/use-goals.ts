import { useWalletsList } from "./use-wallets-list.ts";
import { useWalletGoalsView } from "../data-selectors";
import type { Goal } from "../wallets-api";


interface UseGoalsReturn {
	goals: Goal[];
	isPending: boolean;
	isError: boolean;
}

const useGoals = (): UseGoalsReturn => {
	const { wallets, isPending, isError } = useWalletsList(undefined, 'long-term-goal');
	const goals = useWalletGoalsView(wallets);

	return { goals, isPending, isError };
};

export { useGoals };
export type { UseGoalsReturn };
