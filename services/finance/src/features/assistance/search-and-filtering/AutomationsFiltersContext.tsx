import { createContext, use, useCallback, useMemo, useState } from "react";

import type { FC, ReactNode } from "react";


interface AutomationsFiltersContextType {
	search: string;
	setSearch: (search: string) => void;
	statusFilter: string;
	setStatusFilter: (statusFilter: string | null) => void;
}

const AutomationsFiltersContext = createContext<AutomationsFiltersContextType | null>(null);


interface AutomationsFiltersContextProviderProps {
	children: ReactNode;
}

const AutomationsFiltersContextProvider: FC<AutomationsFiltersContextProviderProps> = ({
	children,
}) => {
	const [search, setSearch] = useState<string>('');
	const [statusFilter, setStatusFilter] = useState<string>('all');

	const setStatusFilterProtected = useCallback((newStatus: string | null) => {
		setStatusFilter(newStatus ?? 'all');
	}, []);

	const filterValues = useMemo<AutomationsFiltersContextType>(() => ({
		search,
		statusFilter,
		setSearch,
		setStatusFilter: setStatusFilterProtected,
	}), [search, setStatusFilterProtected, statusFilter]);

	return (
		<AutomationsFiltersContext value={filterValues}>
			{children}
		</AutomationsFiltersContext>
	);
}

const useAutomationsFiltersContext = () => {
	const context = use(AutomationsFiltersContext);

	if (!context) {
		throw new Error('useAutomationsFiltersContext must be used within the context');
	}

	return context;
}

export { AutomationsFiltersContextProvider, useAutomationsFiltersContext };
