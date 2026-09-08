import { SlideOverPanel } from "@shared/overlays";
import { FundGoalForm } from "./fund-goal/FundGoalForm.tsx";
import { fundGoalTitle } from "./config.ts";

import type { FC, ReactNode } from "react";
import type { Goal } from "@entity/wallets";


interface FundGoalPanelProps {
	goal: Goal;
	children: ReactNode;
}

const FundGoalPanel: FC<FundGoalPanelProps> = ({ goal, children }) => (
	<SlideOverPanel trigger={children} title={fundGoalTitle(goal.name)}>
		{({ close }) => (
			<FundGoalForm goal={goal} onClose={close} />
		)}
	</SlideOverPanel>
);

FundGoalPanel.displayName = 'FundGoalPanel';

export { FundGoalPanel };
export type { FundGoalPanelProps };
