import type { FC } from "react";
import { FinanceButton } from "@internal/ui-library";

import { NeedsActionPanel } from "@widget/dashboard";
import { AutomationsCard, GoalsCard, WhatIfCard, AiAssistantPanel } from "@widget/planning";


const PlanningPage: FC = () => {
	return (
		<div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-[22px] pb-[70px] pt-[22px]">
			<div className="flex flex-wrap items-center gap-3.5">
				<h1 className="font-display text-2xl font-semibold tracking-[-0.01em]">Planning</h1>
				<span className="hidden font-numeric text-[11px] uppercase tracking-[0.08em] text-text-3 sm:block">
					Set intent · Model · Discuss
				</span>
				<div className="flex-1" />
				<FinanceButton className="shadow-[0_4px_14px_var(--glow)]">＋ New goal</FinanceButton>
			</div>

			<NeedsActionPanel />

			<div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_380px]">
				<div className="flex flex-col gap-4">
					<AutomationsCard />
					<GoalsCard />
					<WhatIfCard />
				</div>
				<AiAssistantPanel className="sticky top-[70px]" comingSoon />
			</div>
		</div>
	);
};

PlanningPage.displayName = 'PlanningPage';

export { PlanningPage };
export default PlanningPage;
