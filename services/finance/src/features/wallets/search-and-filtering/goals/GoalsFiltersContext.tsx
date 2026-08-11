import { createContext, use, useCallback, useMemo, useState } from "react";

import type { FC, ReactNode } from "react";


interface GoalsFiltersContextType {
	search: string;
	setSearch: (search: string) => void;
	statusFilter: string;
	setStatusFilter: (statusFilter: string | null) => void;
}

const GoalsFiltersContext = createContext<GoalsFiltersContextType | null>(null);


interface GoalsFiltersContextProviderProps {
	children: ReactNode;
}

const GoalsFiltersContextProvider: FC<GoalsFiltersContextProviderProps> = ({
	children,
}) => {
	const [search, setSearch] = useState<string>('');
	const [statusFilter, setStatusFilter] = useState<string>('all');

	const setStatusFilterProtected = useCallback((newStatus: string | null) => {
		setStatusFilter(newStatus ?? 'all');
	}, []);

	const filterValues = useMemo<GoalsFiltersContextType>(() => ({
		search,
		statusFilter,
		setSearch,
		setStatusFilter: setStatusFilterProtected,
	}), [search, setStatusFilterProtected, statusFilter]);

	return (
		<GoalsFiltersContext value={filterValues}>
			{children}
		</GoalsFiltersContext>
	);
}

const useGoalsFiltersContext = () => {
	const context = use(GoalsFiltersContext);

	if (!context) {
		throw new Error('useGoalsFiltersContext must be used within the context');
	}

	return context;
}

export { GoalsFiltersContextProvider, useGoalsFiltersContext };
