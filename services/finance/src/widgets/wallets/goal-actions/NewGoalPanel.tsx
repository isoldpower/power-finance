import { SlideOverPanel } from "@shared/overlays";
import { NewGoalForm } from "./new-goal/NewGoalForm.tsx";
import { NEW_GOAL_LABELS } from "./config.ts";

import type { FC, ReactNode } from "react";


interface NewGoalPanelProps {
	children: ReactNode;
}

const NewGoalPanel: FC<NewGoalPanelProps> = ({ children }) => (
	<SlideOverPanel trigger={children} title={NEW_GOAL_LABELS.title}>
		{({ close }) => (
			<NewGoalForm onClose={close} />
		)}
	</SlideOverPanel>
);

NewGoalPanel.displayName = 'NewGoalPanel';

export { NewGoalPanel };
export type { NewGoalPanelProps };
