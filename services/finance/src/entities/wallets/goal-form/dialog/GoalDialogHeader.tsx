import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalDialogHeaderProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const GoalDialogHeader: FC<GoalDialogHeaderProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-start gap-3"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalDialogHeader.displayName = 'GoalDialogHeader';

export { GoalDialogHeader };
export type { GoalDialogHeaderProps };
