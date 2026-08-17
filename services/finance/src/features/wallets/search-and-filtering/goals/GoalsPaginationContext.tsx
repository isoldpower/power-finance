import { createContext, use, useCallback, useMemo, useState } from "react";

import type { FC, ReactNode } from "react";
import type { Goal } from "@entity/wallets";


interface GoalsPaginationContextType {
	from: number;
	to: number;
	total: number;
	pageSize: number;
	pageNumber: number;
	pageCount: number;
	scrollForward: () => void;
	scrollBackward: () => void;
	paginatedGoals: Goal[];
}

const GoalsPaginationContext = createContext<GoalsPaginationContextType | null>(null);

interface GoalsPaginationContextProviderProps {
	children: ReactNode;
	pageSize: number;
	total: number;
	goals: Goal[];
}

const GoalsPaginationContextProvider: FC<GoalsPaginationContextProviderProps> = ({
	children,
	pageSize,
	total,
	goals,
}) => {
	const [page, setPage] = useState<number>(1);

	const pageCount = useMemo(() => {
		return Math.max(1, Math.ceil(goals.length / pageSize));
	}, [goals.length, pageSize]);
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
	const paginatedGoals = useMemo(() => {
		return goals.slice(startIndex, endIndex + 1);
	}, [endIndex, goals, startIndex]);

	const paginationValues = useMemo<GoalsPaginationContextType>(() => ({
		scrollBackward,
		scrollForward,
		paginatedGoals,
		total,
		pageSize,
		pageCount,
		pageNumber,
		from: startIndex,
		to: endIndex,
	}), [scrollBackward, scrollForward, paginatedGoals, total, pageSize, pageCount, pageNumber, startIndex, endIndex]);

	return (
		<GoalsPaginationContext value={paginationValues}>
			{children}
		</GoalsPaginationContext>
	);
}

const useGoalsPaginationContext = () => {
	const context = use(GoalsPaginationContext);

	if (!context) {
		throw new Error('useGoalsPaginationContext must be used within the context');
	}

	return context;
}

export { GoalsPaginationContextProvider, useGoalsPaginationContext };
