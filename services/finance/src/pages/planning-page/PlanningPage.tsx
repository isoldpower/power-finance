import type { FC } from "react";
import { FinanceButton, FinanceTooltip } from "@internal/ui-library";

import { useActions } from "@feature/actions";
import { NeedsActionPanel } from "@widget/dashboard";
import { AutomationsCard, GoalsCard, WhatIfCard, PlanningAiAssistant, NewGoalPanel } from "@widget/planning";


const PlanningPage: FC = () => {
	const { actions, isPending } = useActions();
	const inSync = !isPending && actions.length === 0;

	return (
		<div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-[22px] pb-[70px] pt-[22px]">
			<div className="fx-rise [animation-delay:0.05s] flex flex-wrap items-center gap-3.5">
				<h1 className="font-display text-2xl font-semibold tracking-[-0.01em]">Planning</h1>
				{inSync ? (
					<FinanceTooltip content="Everything is in sync — nothing needs your approval right now.">
						<span className="fx-slidein inline-flex cursor-default items-center gap-1.5 rounded-full bg-pos-soft px-2.5 py-1 text-[11.5px] font-semibold text-pos">
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
								<polyline points="20 6 9 17 4 12" />
							</svg>
							In sync
						</span>
					</FinanceTooltip>
				) : (
					<span className="hidden font-numeric text-[11px] uppercase tracking-[0.08em] text-text-3 sm:block">
						Set intent · Model · Discuss
					</span>
				)}
				<div className="flex-1" />
				<NewGoalPanel>
					<FinanceButton className="shadow-[0_4px_14px_var(--glow)]">＋ New goal</FinanceButton>
				</NewGoalPanel>
			</div>

			<NeedsActionPanel className="fx-rise [animation-delay:0.12s]" />

			<div className="fx-rise [animation-delay:0.2s] grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_380px]">
				<div className="flex flex-col gap-4">
					<AutomationsCard />
					<GoalsCard />
					<WhatIfCard />
				</div>
				<PlanningAiAssistant />
			</div>
		</div>
	);
};

PlanningPage.displayName = 'PlanningPage';

export { PlanningPage };
export default PlanningPage;
