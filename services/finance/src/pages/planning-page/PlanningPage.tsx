import type { FC } from "react";
import { FinanceBadge, FinanceCard } from "@internal/ui-library";

const PlanningPage: FC = () => {
	return (
		<div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-[22px] pb-[70px] pt-[22px]">
			<div className="flex flex-wrap items-center gap-3.5">
				<h1 className="font-display text-2xl font-semibold tracking-[-0.01em]">Planning</h1>
				<span className="font-numeric text-[11px] uppercase tracking-[0.08em] text-text-3">
					Budgets · Goals · Forecasts
				</span>
			</div>
			<FinanceCard className="flex flex-col items-center gap-3 px-6 py-16 text-center">
				<FinanceBadge tone="viol" appearance="soft">Coming soon</FinanceBadge>
				<div className="font-display text-lg font-semibold">Plan budgets and goals</div>
				<p className="max-w-md text-sm text-text-2">
					Budgets, savings goals and cash-flow forecasting will live here.
				</p>
			</FinanceCard>
		</div>
	);
};

PlanningPage.displayName = 'PlanningPage';

export { PlanningPage };
export default PlanningPage;
