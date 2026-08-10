import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalFormFieldError: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mt-1 text-[11.5px] text-neg"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalFormFieldError.displayName = 'GoalFormFieldError';

export { GoalFormFieldError };
