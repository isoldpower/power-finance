import { Tooltip, RevealMotion } from "@shared/interactions";
import {
	CenteredList,
	MainPageTitle,
	PageContainer,
	SidebarColumnsContainer,
	SpaceOccupant,
	StackedList,
} from "@shared/components";
import { FinanceButton, FinanceCard } from "@internal/ui-library";

import { PlanningAiAssistant, NeedsActionPanel, ToggleableAutomationRow } from "@process/assistance";
import { DeletableGoalRow } from "@process/wallets";
import {
	AutomationsBrowserContextProvider,
	AutomationsBrowserFilters,
	AutomationsBrowserHeader, AutomationsBrowserPagination,
	FilteredAutomationsDirectory,
	NewRulePanel,
	WhatIfCard
} from "@widget/assistance";
import {
	FilteredGoalsDirectory,
	GoalsBrowserContextProvider,
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
	CheckIcon,
	PlanningStatus,
} from "@entity/assistance";
import { GoalsToolbar } from "@entity/wallets";

import { assistantContent } from "./config.ts";

import type { FC } from "react";


const PlanningPage: FC = () => {
	return (
		<PageContainer>
			<RevealMotion delay={0.1}>
				<CenteredList gap={3.5}>
					<MainPageTitle>
						Planning
					</MainPageTitle>
					<ShowOnResolved>
						<Tooltip content="Everything is in sync — nothing needs your approval right now.">
							<PlanningStatus.SyncBadge>
								<CheckIcon />
								In sync
							</PlanningStatus.SyncBadge>
						</Tooltip>
					</ShowOnResolved>
					<ShowOnUnresolved>
						<PlanningStatus.Steps>
							Set intent · Model · Discuss
						</PlanningStatus.Steps>
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
				<NeedsActionPanel />
			</RevealMotion>
			<RevealMotion delay={0.1}>
				<SidebarColumnsContainer sidebarWidth="380px">
					<StackedList>
						<AutomationsBrowserContextProvider>
							<FinanceCard className="overflow-hidden">
								<AutomationsBrowserHeader>
									<NewRulePanel>
										<AutomationsToolbar.Action>
											＋ New rule
										</AutomationsToolbar.Action>
									</NewRulePanel>
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
						</AutomationsBrowserContextProvider>
						<GoalsBrowserContextProvider>
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
												wallet={goal}
												order={index}
											/>
										)}
									</FilteredGoalsDirectory>
									<GoalsBrowserPagination />
								</GoalsListFx>
							</FinanceCard>
						</GoalsBrowserContextProvider>
						<WhatIfCard />
					</StackedList>
					<PlanningAiAssistant {...assistantContent} />
				</SidebarColumnsContainer>
			</RevealMotion>
		</PageContainer>
	);
};

PlanningPage.displayName = 'PlanningPage';

export { PlanningPage };
export default PlanningPage;
