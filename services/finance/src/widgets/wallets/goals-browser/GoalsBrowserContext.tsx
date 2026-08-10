import {
	GoalsFiltersContextProvider,
	GoalsPaginationContextProvider,
	useGoalsBrowser,
	useGoalsFiltersContext,
} from "@feature/wallets";

import { GOALS_PAGE_SIZE } from "../config.ts";

import type { FC, ReactNode } from "react";


interface GoalsBrowserContextProviderProps {
	children: ReactNode;
}

const GoalsBrowserContextProvider: FC<GoalsBrowserContextProviderProps> = ({ children }) => {
	return (
		<GoalsFiltersContextProvider>
			<GoalsBrowserInternalContext>
				{ children }
			</GoalsBrowserInternalContext>
		</GoalsFiltersContextProvider>
	);
}

interface GoalsBrowserInternalContextProps {
	children: ReactNode;
}

const GoalsBrowserInternalContext: FC<GoalsBrowserInternalContextProps> = ({ children }) => {
	const { search, statusFilter } = useGoalsFiltersContext();
	const { searchResults: { goals, total } } = useGoalsBrowser({
		search: { search },
		filters: { statusFilter },
	});

	return (
		<GoalsPaginationContextProvider
			pageSize={GOALS_PAGE_SIZE}
			total={total}
			goals={goals}
		>
			{children}
		</GoalsPaginationContextProvider>
	);
}

export { GoalsBrowserContextProvider };
