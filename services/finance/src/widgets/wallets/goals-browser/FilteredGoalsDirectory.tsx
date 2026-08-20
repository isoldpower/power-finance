import { Fragment } from "react";
import { GoalsEmptyNotice } from "@entity/wallets";
import { useGoals, useGoalsPaginationContext } from "@feature/wallets";

import type { FC, ReactNode } from "react";
import type { Goal } from "@entity/wallets";


interface FilteredGoalsDirectoryProps {
	children: (goal: Goal, index: number) => ReactNode;
}

const FilteredGoalsDirectory: FC<FilteredGoalsDirectoryProps> = ({ children }) => {
	const { paginatedGoals, total, pageNumber } = useGoalsPaginationContext();
	const { goals } = useGoals();

	if (total === 0) {
		return (
			<GoalsEmptyNotice>
				{goals.length === 0 
					? 'No goals yet... Try creating new one' 
					: 'No goals match your search.'}
			</GoalsEmptyNotice>
		);
	}

	return paginatedGoals.map((goal, index) => (
		<Fragment key={`${pageNumber.toString()}-${goal.id}`}>
			{children(goal, index)}
		</Fragment>
	));
}

export { FilteredGoalsDirectory };
export type { FilteredGoalsDirectoryProps };
