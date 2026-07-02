import type { FC } from "react";
import { FinanceButton } from "@internal/ui-library";
import { Tooltip, RevealMotion } from "@shared/interactions";

import { WhatIfCard, CheckIcon } from "@widget/assistance";
import { AutomationsCard, PlanningAiAssistant, NeedsActionPanel } from "@process/assistance";
import { GoalsCard, NewGoalPanel } from "@process/wallets";
import {useActions} from "@feature/assistance";


const PlanningPage: FC = () => {
	const { actions, isPending } = useActions();
	const inSync = !isPending && actions.length === 0;

	return (
		<div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-[22px] pb-[70px] pt-[22px]">
			<RevealMotion delay={0.05} className="flex flex-wrap items-center gap-3.5">
				<h1 className="font-display text-2xl font-semibold tracking-[-0.01em]">Planning</h1>
				{inSync ? (
					<Tooltip content="Everything is in sync — nothing needs your approval right now.">
						<span className="fx-slidein inline-flex cursor-default items-center gap-1.5 rounded-full bg-pos-soft px-2.5 py-1 text-[11.5px] font-semibold text-pos">
							<CheckIcon />
							In sync
						</span>
					</Tooltip>
				) : (
					<span className="hidden font-numeric text-[11px] uppercase tracking-[0.08em] text-text-3 sm:block">
						Set intent · Model · Discuss
					</span>
				)}
				<div className="flex-1" />
				<NewGoalPanel>
					<FinanceButton className="shadow-[0_4px_14px_var(--glow)]">＋ New goal</FinanceButton>
				</NewGoalPanel>
			</RevealMotion>
			<RevealMotion delay={0.12}>
				<NeedsActionPanel />
			</RevealMotion>
			<RevealMotion delay={0.2} className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_380px]">
				<div className="flex flex-col gap-4">
					<AutomationsCard />
					<GoalsCard />
					<WhatIfCard />
				</div>
				<PlanningAiAssistant />
			</RevealMotion>
		</div>
	);
};

PlanningPage.displayName = 'PlanningPage';

export { PlanningPage };
export default PlanningPage;
