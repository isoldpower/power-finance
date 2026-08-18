import { SlideOver, SlideOverTrigger, Tooltip } from "@shared/overlays";
import { RevealMotion } from "@shared/motion";
import {
	CenteredList,
	PageContainer,
	SidebarColumnsContainer,
	SpaceOccupant,
	StackedList
} from "@shared/pure-components/layout";
import { PageTitle } from "@shared/pure-components/typography";
import { CheckIcon } from "@shared/pure-components/icons";
import { FinanceButton, FinanceCard } from "@internal/ui-library";
import { PlanningAiAssistant, NeedsActionPanel, ToggleableAutomationRow } from "@process/assistance";
import { DeletableGoalRow } from "@process/wallets";
import {
	AutomationsBrowserProvider,
	AutomationsBrowserFilters,
	AutomationsBrowserHeader, 
	AutomationsBrowserPagination,
	FilteredAutomationsDirectory,
	WhatIfCard
} from "@widget/assistance";
import {
	FilteredGoalsDirectory,
	GoalsBrowserProvider,
	GoalsBrowserFilters,
	GoalsBrowserHeader,
	GoalsBrowserPagination,
	NewGoalPanel,
} from "@widget/wallets";
import {
	AutomationsListFx,
	ShowOnResolved,
	ShowOnUnresolved,
} from "@feature/assistance";
import { GoalsListFx } from "@feature/wallets";
import {
	AutomationsToolbar,
	PlanningStatusSteps,
	PlanningStatusSyncBadge,
} from "@entity/assistance";
import { GoalsToolbar } from "@entity/wallets";
import { planningSlides, planningSlidesRegistry } from "./SlideOverRegistry.tsx";

import type { FC } from "react";


const PlanningPage: FC = () => {
	return (
		<PageContainer>
			<RevealMotion delay={0.1}>
				<CenteredList gap={3.5}>
					<PageTitle>
						Planning
					</PageTitle>
					<ShowOnResolved>
						<Tooltip content="Everything is in sync — nothing needs your approval right now.">
							<PlanningStatusSyncBadge>
								<CheckIcon />
								In sync
							</PlanningStatusSyncBadge>
						</Tooltip>
					</ShowOnResolved>
					<ShowOnUnresolved>
						<PlanningStatusSteps>
							Set intent · Model · Discuss
						</PlanningStatusSteps>
					</ShowOnUnresolved>
					<SpaceOccupant />
					<NewGoalPanel>
						<FinanceButton className="shadow-[0_4px_14px_var(--glow)]">
							＋ New goal
						</FinanceButton>
					</NewGoalPanel>
				</CenteredList>
			</RevealMotion>
			<RevealMotion delay={0.1}>
				<NeedsActionPanel descriptor="mirrored from Dashboard" />
			</RevealMotion>
			<RevealMotion delay={0.1}>
				<SidebarColumnsContainer sidebarWidth="380px">
					<StackedList>
						<AutomationsBrowserProvider>
							<FinanceCard className="overflow-hidden">
								<AutomationsBrowserHeader>
									<SlideOverTrigger panelId={planningSlides.newRule}>
										<AutomationsToolbar.Action>
											＋ New rule
										</AutomationsToolbar.Action>
									</SlideOverTrigger>
								</AutomationsBrowserHeader>
								<AutomationsListFx>
									<AutomationsBrowserFilters />
									<FilteredAutomationsDirectory>
										{(rule, index) => (
											<ToggleableAutomationRow
												rule={rule}
												order={index}
											/>
										)}
									</FilteredAutomationsDirectory>
									<AutomationsBrowserPagination />
								</AutomationsListFx>
							</FinanceCard>
						</AutomationsBrowserProvider>
						<GoalsBrowserProvider>
							<FinanceCard className="overflow-hidden">
								<GoalsBrowserHeader>
									<NewGoalPanel>
										<GoalsToolbar.Action>
											＋ Add goal
										</GoalsToolbar.Action>
									</NewGoalPanel>
								</GoalsBrowserHeader>
								<GoalsListFx>
									<GoalsBrowserFilters />
									<FilteredGoalsDirectory>
										{(goal, index) => (
											<DeletableGoalRow
												goal={goal}
												order={index}
											/>
										)}
									</FilteredGoalsDirectory>
									<GoalsBrowserPagination />
								</GoalsListFx>
							</FinanceCard>
						</GoalsBrowserProvider>
						<WhatIfCard />
					</StackedList>
					<PlanningAiAssistant />
				</SidebarColumnsContainer>
			</RevealMotion>
			<SlideOver panelsRegistry={planningSlidesRegistry} />
		</PageContainer>
	);
};

PlanningPage.displayName = 'PlanningPage';

export { PlanningPage };
