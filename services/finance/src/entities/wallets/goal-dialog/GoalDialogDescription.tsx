import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalDialogDescription: FC<Omit<BaseHTMLAttributes<HTMLParagraphElement>, 'className'>> = ({
	children,
	...props
}) => (
	<p
		className={cn(
			"mt-1 text-[13px] leading-relaxed text-text-2"
		)}
		{...props}
	>
		{children}
	</p>
);

GoalDialogDescription.displayName = 'GoalDialogDescription';

export { GoalDialogDescription };
