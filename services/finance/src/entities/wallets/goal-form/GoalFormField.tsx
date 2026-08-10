import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalFormField: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mb-4"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalFormField.displayName = 'GoalFormField';

export { GoalFormField };
