import {
	AutomationsFiltersContextProvider,
	AutomationsPaginationContextProvider,
	useAutomationsBrowser,
	useAutomationsFiltersContext,
} from "@feature/assistance";

import { AUTOMATIONS_PAGE_SIZE } from "../config.ts";

import type { FC, ReactNode } from "react";


interface AutomationsBrowserContextProviderProps {
	children: ReactNode;
}

const AutomationsBrowserContextProvider: FC<AutomationsBrowserContextProviderProps> = ({ children }) => {
	return (
		<AutomationsFiltersContextProvider>
			<AutomationsBrowserInternalContext>
				{ children }
			</AutomationsBrowserInternalContext>
		</AutomationsFiltersContextProvider>
	);
}

interface AutomationsBrowserInternalContextProps {
	children: ReactNode;
}

const AutomationsBrowserInternalContext: FC<AutomationsBrowserInternalContextProps> = ({ children }) => {
	const { search, statusFilter } = useAutomationsFiltersContext();
	const { searchResults: { rules, total } } = useAutomationsBrowser({
		search: { search },
		filters: { statusFilter },
	});

	return (
		<AutomationsPaginationContextProvider
			pageSize={AUTOMATIONS_PAGE_SIZE}
			total={total}
			rules={rules}
		>
			{children}
		</AutomationsPaginationContextProvider>
	);
}

export { AutomationsBrowserContextProvider };
