import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalDialogContentProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const GoalDialogContent: FC<GoalDialogContentProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"min-w-0 flex-1"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalDialogContent.displayName = 'GoalDialogContent';

export { GoalDialogContent };
export type { GoalDialogContentProps };
