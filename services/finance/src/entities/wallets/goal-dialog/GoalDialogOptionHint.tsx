import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalDialogOptionHint: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"text-[11.5px] text-text-2"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalDialogOptionHint.displayName = 'GoalDialogOptionHint';

export { GoalDialogOptionHint };
