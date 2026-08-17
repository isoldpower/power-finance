import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalDialogActionsProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const GoalDialogActions: FC<GoalDialogActionsProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mt-5 flex gap-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalDialogActions.displayName = 'GoalDialogActions';

export { GoalDialogActions };
export type { GoalDialogActionsProps };
