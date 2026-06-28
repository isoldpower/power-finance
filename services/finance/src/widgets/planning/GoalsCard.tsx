import type { FC } from "react";
import { FinanceCard, FinanceBadge } from "@internal/ui-library";

import { useGoalsBrowser } from "@feature/goals";
import { NewGoalPanel, DeleteGoalDialog } from "@process/planning";
import { ListFilterBar, ListPager, GoalRow, GoalSkeletonRow, RowDeleteButton } from "@entity/planning";

import { GOALS_PAGE_SIZE, GOALS_STATUS_OPTIONS } from "./config.ts";

const PLACEHOLDER_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5'];

const GoalsCard: FC = () => {
	const {
		isPending,
		totalCount,
		filteredGoals,
		pagedGoals,
		page,
		setPage,
		query,
		setQuery,
		status,
		setStatus,
	} = useGoalsBrowser(GOALS_PAGE_SIZE);

	return (
		<FinanceCard className="overflow-hidden">
			<div className="flex items-center gap-2.5 border-b border-border px-[18px] py-3.5">
				<span className="text-sm font-semibold">Long-term goals</span>
				<FinanceBadge tone="pos" appearance="soft" size="sm">NEW</FinanceBadge>
				<div className="flex-1" />
				<NewGoalPanel>
					<button type="button" className="text-[12.5px] font-semibold text-primary hover:underline">＋ Add goal</button>
				</NewGoalPanel>
			</div>
			{isPending ? (
				PLACEHOLDER_KEYS.map((key) => <GoalSkeletonRow key={key} />)
			) : (
				<>
				<ListFilterBar
					query={query}
					onQueryChange={setQuery}
					placeholder="Search goals…"
					filter={status}
					onFilterChange={setStatus}
					options={GOALS_STATUS_OPTIONS}
				/>
				{filteredGoals.length === 0 ? (
					<div className="px-[18px] py-6 text-center text-[13px] text-text-3">
						{totalCount === 0 ? 'No goals yet... Try creating new one' : 'No goals match your search.'}
					</div>
				) : null}
				{pagedGoals.map((goal, index) => (
					<GoalRow
						key={`${page.toString()}-${goal.id}`}
						style={{ animationDelay: `${(index * 0.04).toString()}s` }}
						icon={goal.icon}
						color={goal.color}
						name={goal.name}
						monthly={goal.monthly}
						eta={goal.eta}
						saved={goal.saved}
						target={goal.target}
						percent={goal.percent}
						deleteSlot={
							<DeleteGoalDialog id={goal.id} name={goal.name} saved={goal.saved}>
								<RowDeleteButton label={`Delete ${goal.name}`} />
							</DeleteGoalDialog>
						}
					/>
				))}
				<ListPager page={page} pageSize={GOALS_PAGE_SIZE} total={filteredGoals.length} onPageChange={setPage} />
				</>
			)}
		</FinanceCard>
	);
};

GoalsCard.displayName = 'GoalsCard';

export { GoalsCard };
