import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalFormNameRow: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"flex items-center gap-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalFormNameRow.displayName = 'GoalFormNameRow';

export { GoalFormNameRow };
