import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalDialogOptionTitle: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"text-[13px] font-semibold"
		)}
		{...props}
	>
		{children}
	</div>
);

GoalDialogOptionTitle.displayName = 'GoalDialogOptionTitle';

export { GoalDialogOptionTitle };
