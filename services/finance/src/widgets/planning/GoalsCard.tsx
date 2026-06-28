import type { FC } from "react";
import { useState } from "react";
import { FinanceCard, FinanceBadge, FinanceMoney, UiSkeleton, Icons } from "@internal/ui-library";

import { useGoals } from "@feature/goals";
import { NewGoalPanel } from "./NewGoalPanel.tsx";
import { DeleteGoalDialog } from "./DeleteGoalDialog.tsx";
import { ListPager } from "./ListPager.tsx";
import { ListFilterBar } from "./ListFilterBar.tsx";

const PAGE_SIZE = 5;
const PLACEHOLDER_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5'];

const STATUS_OPTIONS = [
	{ value: 'all', label: 'All goals' },
	{ value: 'in-progress', label: 'In progress' },
	{ value: 'reached', label: 'Reached' },
];

const GoalsCard: FC = () => {
	const { goals, isPending } = useGoals();
	const [page, setPage] = useState(0);
	const [query, setQuery] = useState('');
	const [status, setStatus] = useState('all');

	const normalizedQuery = query.trim().toLowerCase();
	const filteredGoals = goals.filter((goal) => {
		const matchesQuery = normalizedQuery === '' || goal.name.toLowerCase().includes(normalizedQuery);
		const matchesStatus = status === 'all' || (status === 'reached' ? goal.percent >= 100 : goal.percent < 100);
		return matchesQuery && matchesStatus;
	});

	const pageCount = Math.max(1, Math.ceil(filteredGoals.length / PAGE_SIZE));
	const safePage = Math.min(page, pageCount - 1);
	const pagedGoals = filteredGoals.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

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
				PLACEHOLDER_KEYS.map((key) => (
					<div key={key} className="border-b border-border px-[18px] py-3.5 last:border-b-0">
						<div className="mb-2.5 flex items-center gap-3">
							<UiSkeleton className="size-9 flex-none rounded-[10px]" />
							<div className="min-w-0 flex-1 space-y-1.5">
								<UiSkeleton className="h-3.5 w-1/3" />
								<UiSkeleton className="h-3 w-1/2" />
							</div>
							<UiSkeleton className="h-4 w-16" />
						</div>
						<div className="flex h-5 items-center gap-2.5">
							<UiSkeleton className="h-2 flex-1 rounded-full" />
							<UiSkeleton className="h-3 w-8 rounded" />
						</div>
					</div>
				))
			) : (
				<>
				<ListFilterBar
					query={query}
					onQueryChange={setQuery}
					placeholder="Search goals…"
					filter={status}
					onFilterChange={setStatus}
					options={STATUS_OPTIONS}
				/>
				{filteredGoals.length === 0 ? (
					<div className="px-[18px] py-6 text-center text-[13px] text-text-3">
						{goals.length === 0 ? 'No goals yet... Try creating new one' : 'No goals match your search.'}
					</div>
				) : null}
				{pagedGoals.map((goal, index) => (
					<div key={`${safePage.toString()}-${goal.id}`} style={{ animationDelay: `${(index * 0.04).toString()}s` }} className="fx-slidein border-b border-border px-[18px] py-3.5 last:border-b-0">
						<div className="mb-2.5 flex items-center gap-3">
							<div className="flex size-9 flex-none items-center justify-center rounded-[10px] text-[15px]" style={{ background: goal.color }}>{goal.icon}</div>
							<div className="min-w-0 flex-1">
								<div className="text-[13.5px] font-semibold">{goal.name}</div>
								<div className="text-[11px] text-text-3">{goal.monthly} · {goal.eta}</div>
							</div>
							<div className="text-right">
								<span className="font-display text-sm font-semibold">{goal.saved}</span>
								<span className="text-[11px] text-text-3"> / {goal.target}</span>
							</div>
							<DeleteGoalDialog id={goal.id} name={goal.name} saved={goal.saved}>
								<button
									type="button"
									aria-label={`Delete ${goal.name}`}
									className="flex size-7 flex-none items-center justify-center rounded-[7px] text-text-3 transition-colors hover:bg-[var(--neg-soft)] hover:text-neg"
								>
									<Icons.Trash2 size={15} />
								</button>
							</DeleteGoalDialog>
						</div>
						<div className="flex items-center gap-2.5">
							<div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
								<div className="h-full rounded-full bg-[image:var(--accent-grad)]" style={{ width: `${goal.percent.toString()}%` }} />
							</div>
							<FinanceMoney tone="muted" size="sm" className="w-[34px] text-right">{goal.percent}%</FinanceMoney>
						</div>
					</div>
				))}
				<ListPager page={safePage} pageSize={PAGE_SIZE} total={filteredGoals.length} onPageChange={setPage} />
				</>
			)}
		</FinanceCard>
	);
};

GoalsCard.displayName = 'GoalsCard';

export { GoalsCard };
