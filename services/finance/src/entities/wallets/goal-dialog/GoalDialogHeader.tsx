import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalDialogHeader: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
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
