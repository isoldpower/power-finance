import { createContext, use, useCallback, useMemo, useState } from "react";

import type { FC, ReactNode } from "react";
import type { AutomationRule } from "../automations-api";


interface AutomationsPaginationContextType {
	from: number;
	to: number;
	total: number;
	pageSize: number;
	pageNumber: number;
	pageCount: number;
	scrollForward: () => void;
	scrollBackward: () => void;
	paginatedRules: AutomationRule[];
}

const AutomationsPaginationContext = createContext<AutomationsPaginationContextType | null>(null);

interface AutomationsPaginationContextProviderProps {
	children: ReactNode;
	pageSize: number;
	total: number;
	rules: AutomationRule[];
}

const AutomationsPaginationContextProvider: FC<AutomationsPaginationContextProviderProps> = ({
	children,
	pageSize,
	total,
	rules,
}) => {
	const [page, setPage] = useState<number>(1);

	const pageCount = useMemo(() => {
		return Math.max(1, Math.ceil(rules.length / pageSize));
	}, [pageSize, rules.length]);
	const pageNumber = useMemo(() => {
		return Math.min(page, pageCount);
	}, [page, pageCount]);

	const scrollForward = useCallback(() => {
		setPage((previous) => Math.min(pageCount, previous + 1));
	}, [pageCount]);
	const scrollBackward = useCallback(() => {
		setPage((previous) => Math.max(1, previous - 1));
	}, []);

	const startIndex = useMemo(() => {
		return (pageNumber - 1) * pageSize;
	}, [pageNumber, pageSize]);
	const endIndex = useMemo(() => {
		return pageNumber * pageSize - 1;
	}, [pageNumber, pageSize]);
	const paginatedRules = useMemo(() => {
		return rules.slice(startIndex, endIndex + 1);
	}, [endIndex, rules, startIndex]);

	const paginationValues = useMemo<AutomationsPaginationContextType>(() => ({
		scrollBackward,
		scrollForward,
		paginatedRules,
		total,
		pageSize,
		pageCount,
		pageNumber,
		from: startIndex,
		to: endIndex,
	}), [scrollBackward, scrollForward, paginatedRules, total, pageSize, pageCount, pageNumber, startIndex, endIndex]);

	return (
		<AutomationsPaginationContext value={paginationValues}>
			{children}
		</AutomationsPaginationContext>
	);
}

const useAutomationsPaginationContext = () => {
	const context = use(AutomationsPaginationContext);

	if (!context) {
		throw new Error('useAutomationsPaginationContext must be used within the context');
	}

	return context;
}

export { AutomationsPaginationContextProvider, useAutomationsPaginationContext };
