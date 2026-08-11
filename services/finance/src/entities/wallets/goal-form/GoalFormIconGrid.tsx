import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalFormIconGrid: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"grid grid-cols-6 gap-1"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalFormIconGrid.displayName = 'GoalFormIconGrid';

export { GoalFormIconGrid };
