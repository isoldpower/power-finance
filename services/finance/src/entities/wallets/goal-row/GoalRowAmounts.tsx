import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalRowAmounts: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"text-right"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalRowAmounts.displayName = 'GoalRowAmounts';

export { GoalRowAmounts };
