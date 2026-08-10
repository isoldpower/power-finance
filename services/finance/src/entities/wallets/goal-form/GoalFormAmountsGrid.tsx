import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalFormAmountsGrid: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mb-4 grid grid-cols-2 gap-3"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalFormAmountsGrid.displayName = 'GoalFormAmountsGrid';

export { GoalFormAmountsGrid };
