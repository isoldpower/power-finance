import { cn } from "@internal/ui-library";

import type { FC } from "react";


interface GoalDialogRadioProps {
	selected: boolean;
}

const GoalDialogRadio: FC<GoalDialogRadioProps> = ({ selected }) => (
	<span
		className={cn(
			"mt-0.5 flex size-4 flex-none items-center justify-center rounded-full border-2",
			selected ? "border-primary" : "border-border-strong"
		)}
	>
		{selected ? <span className="size-2 rounded-full bg-primary" /> : null}
	</span>
);

GoalDialogRadio.displayName = 'GoalDialogRadio';

export { GoalDialogRadio };
export type { GoalDialogRadioProps };
