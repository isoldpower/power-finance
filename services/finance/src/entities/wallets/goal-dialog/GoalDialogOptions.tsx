import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalDialogOptions: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mt-4 space-y-2"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalDialogOptions.displayName = 'GoalDialogOptions';

export { GoalDialogOptions };
