import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalRowSaved: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => (
	<span
		className={cn(
			"font-display text-sm font-semibold"
		)}
		{...props}
	>
		{children}
	</span>
);

GoalRowSaved.displayName = 'GoalRowSaved';

export { GoalRowSaved };
