import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalRowTarget: FC<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>> = ({
	children,
	...props
}) => (
	<span
		className={cn(
			"text-[11px] text-text-3"
		)}
		{...props}
	>
		{' / '}
		{children}
	</span>
);

GoalRowTarget.displayName = 'GoalRowTarget';

export { GoalRowTarget };
